<template>
  <BaseCard>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <TextInput
        v-model="todoText"
        id="todo-text"
        label="Todo Task"
        placeholder="What needs to be done?"
        required
        :errorMessage="textError"
        @blur="validateText"
      />

      <SelectInput
        v-model="todoPriority"
        id="todo-priority"
        label="Priority"
        :options="priorityOptions"
        placeholder="Select priority"
        required
        :errorMessage="priorityError"
        @blur="validatePriority"
      />

      <div class="flex justify-end">
        <CustomButton
          :loading="loading"
          type="submit"
          role="Add Todo"
          id="todo-add-edit"
          variant="primary"
        >
          Add Todo
        </CustomButton>
      </div>
    </form></BaseCard
  >
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import CustomButton from '@/elements/CustomButton.vue'
import TextInput from '@/elements/TextInput.vue'
import SelectInput from '@/elements//SelectInput.vue'
import BaseCard from '@/elements/BaseCard.vue'
import { priorityOptions as priorityOptionsList } from '@/constants/options'
import type { BaseTodo, Todo } from '@/types/Todo'
import type { Priority } from '@/types/Priority'

const props = defineProps<{
  loading: boolean
  todoToEdit?: Todo | null
}>()

const todoText = ref(props.todoToEdit?.text ?? '')
const todoPriority = ref(props.todoToEdit?.priority ?? '')
const textError = ref<string | null>(null)
const priorityError = ref<string | null>(null)

const priorityOptions = ref(priorityOptionsList)

const emit = defineEmits<{
  (e: 'add-todo', payload: BaseTodo): void
  (e: 'update-todo', payload: Todo): void
  (e: 'form-submitted'): void
}>()

watch(
  () => props.todoToEdit,
  (newTodo) => {
    todoText.value = newTodo?.text ?? ''
    todoPriority.value = newTodo?.priority ?? ''
  },
)

const validateText = () => {
  if (!todoText.value.trim()) {
    textError.value = 'Task description is required.'
    return false
  }
  textError.value = null
  return true
}

const validatePriority = () => {
  if (!todoPriority.value) {
    priorityError.value = 'Please select a priority.'
    return false
  }
  priorityError.value = null
  return true
}

const validateForm = (): boolean => {
  const isTextValid = validateText()
  const isPriorityValid = validatePriority()
  return isTextValid && isPriorityValid
}

const handleSubmit = () => {
  if (!validateForm()) {
    console.log('Form validation failed', {
      textError: textError.value,
      priorityError: priorityError.value,
    })
    return
  }

  if (props.todoToEdit) {
    emit('update-todo', {
      ...props.todoToEdit,
      text: todoText.value.trim(),
      priority: todoPriority.value as Priority,
    })
  } else {
    emit('add-todo', {
      text: todoText.value.trim(),
      priority: todoPriority.value as Priority,
    })
  }

  emit('form-submitted')
}

const clearForm = () => {
  todoText.value = ''
  todoPriority.value = ''
  textError.value = null
  priorityError.value = null
}

defineExpose({
  clearForm,
})
</script>
