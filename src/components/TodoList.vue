<template>
  <div class="space-y-3">
    <h2 v-if="title" class="text-lg font-semibold text-gray-700 mb-2">{{ title }}</h2>
    <ul class="space-y-3">
      <template v-if="!loading">
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @toggle-complete="onToggleComplete"
          @delete-todo="onDeleteTodo"
          @update-todo="updateItem"
          data-testid="todo-item"
        />
      </template>
      <template v-else-if="loading">
        <TodoItemPlaceholder data-testid="todo-loading" v-for="index in 5" :key="index" />
      </template>
    </ul>
    <BaseCard v-if="!todos.length && !loading" class="text-center py-12">
      <p>{{ emptyMessage }}</p>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '@/elements/BaseCard.vue'
import TodoItem from './TodoItem.vue'
import type { Todo } from '@/types/Todo'
import TodoItemPlaceholder from './placeholders/TodoItemPlaceholder.vue'

interface TodoListProps {
  todos: Todo[]
  title?: string
  emptyMessage?: string
  loading?: boolean
}

withDefaults(defineProps<TodoListProps>(), {
  title: '',
  emptyMessage: 'No tasks here yet!',
})

const emit = defineEmits<{
  (e: 'update:todo', id: string): void
  (e: 'remove:todo', id: string): void
  (e: 'edit:todo', todo: Todo): void
}>()

const onToggleComplete = (id: string) => {
  emit('update:todo', id)
}

const onDeleteTodo = (id: string) => {
  emit('remove:todo', id)
}
const updateItem = (todo: Todo) => {
  emit('edit:todo', todo)
}
</script>
