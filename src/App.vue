<template>
  <TheHeader />
  <TheContainer>
    <TodoForm
      ref="todoFormRef"
      @add-todo="addTodoItem"
      @update-todo="onUpdateTodo"
      :todoToEdit="todoToEdit"
      :loading="loadingNewTodo"
    />
    <TodoList
      :todos="todos ?? []"
      :loading="loadingTodos"
      @update:todo="toggleDone"
      @remove:todo="onDeleteTodo"
      @edit:todo="onEditTodo"
      title="Your tasks:"
      empty-message="No tasks found. Add your first task!"
    />
  </TheContainer>
  <ConfirmPopup
    v-model:isOpen="isConfirmOpen"
    title="Delete task?"
    message="Are you sure you want to delete this todo?"
    confirmText="Delete"
    cancelText="Cancel"
    confirmVariant="danger"
    @confirm="confirmDelete"
    :loading="loadingDelete"
  />
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheContainer from '@/components/TheContainer.vue'
import TodoForm from '@/components/TodoForm.vue'
import TodoList from '@/components/TodoList.vue'
import type { BaseTodo, Todo } from '@/types/Todo'
import { useApi } from '@/composables/useApi'
import { onMounted, ref } from 'vue'
import ConfirmPopup from './components/ConfirmPopup.vue'

const { data: todos, request: getTodos, loading: loadingTodos } = useApi<Todo[]>()
const { request: addEditTodo, loading: loadingNewTodo } = useApi<Todo, Todo>()
const { request: updateTodo } = useApi<Todo, Todo>()
const { request: deleteTodo, loading: loadingDelete } = useApi<{ id: string }, void>()
const isConfirmOpen = ref(false)
const confirmDeleteId = ref<string | null>(null)
const todoToEdit = ref<Todo | null>(null)
const todoFormRef = ref<InstanceType<typeof TodoForm> | null>(null)

onMounted(() => {
  getTodos({ url: '/todos', method: 'GET' })
})

const onDeleteTodo = (id: string) => {
  confirmDeleteId.value = id
  isConfirmOpen.value = true
}
const onEditTodo = (todo: Todo) => {
  todoToEdit.value = todo
}

const addTodoItem = async (todo: BaseTodo) => {
  const newTodo: Todo = {
    ...todo,
    date: new Date().toISOString(),
    isDone: false,
  }
  const res = await addEditTodo({ url: '/todos', method: 'POST', data: newTodo })
  if (res) {
    todos.value = [res, ...(todos.value ?? [])]
    todoFormRef.value?.clearForm()
  }
}

const toggleDone = async (id: string) => {
  const todoIndex = todos.value?.findIndex((todo) => todo.id === id)
  if (todoIndex !== undefined && todoIndex >= 0 && todos.value) {
    const updatedTodo = { ...todos.value[todoIndex], isDone: !todos.value[todoIndex].isDone }
    const res = await updateTodo({ url: `/todos/${id}`, method: 'PUT', data: updatedTodo })
    if (res) {
      todos.value = [...todos.value.slice(0, todoIndex), res, ...todos.value.slice(todoIndex + 1)]
    }
  }
}

const onUpdateTodo = async (updated: Todo) => {
  const res = await addEditTodo({ url: `/todos/${updated.id}`, method: 'PUT', data: updated })
  if (res && todos.value) {
    const index = todos.value.findIndex((t) => t.id === updated.id)
    todos.value = [...todos.value.slice(0, index), res, ...todos.value.slice(index + 1)]
    todoToEdit.value = null
    todoFormRef.value?.clearForm()
  }
}

const confirmDelete = async () => {
  if (!confirmDeleteId.value) return
  const result = await deleteTodo({ url: `/todos/${confirmDeleteId.value}`, method: 'DELETE' })
  if (result !== null) {
    todos.value = todos.value?.filter((t) => t.id !== confirmDeleteId.value) ?? []
  }
  isConfirmOpen.value = false
  confirmDeleteId.value = null
}
</script>

<style scoped></style>
