<template>
  <li
    class="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-md shadow-sm hover:shadow transition-shadow duration-200"
    :class="{ 'opacity-60': todo.isDone }"
  >
    <div class="flex items-center space-x-3 flex-grow min-w-0">
      <Checkbox
        :id="`todo-${todo.id}`"
        :modelValue="todo.isDone"
        @update:modelValue="toggleStatus"
        aria-label="Mark task as complete"
      />
      <div class="min-w-0">
        <p
          class="text-gray-800 font-medium truncate"
          :class="{ 'line-through text-gray-500': todo.isDone }"
        >
          {{ todo.text }}
        </p>
        <p class="text-xs text-gray-500">Added: {{ formattedDate }}</p>
      </div>
    </div>

    <div class="flex items-center space-x-3 ml-3 flex-shrink-0">
      <span
        class="px-2 py-0.5 text-xs font-semibold rounded-full capitalize"
        :class="priorityClasses"
      >
        {{ todo.priority }}
      </span>
      <CustomButton @click="updateItem" aria-label="Delete task" variant="secondary">
        Edit
      </CustomButton>
      <CustomButton @click="deleteItem" aria-label="Delete task" variant="danger">
        Delete
      </CustomButton>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Checkbox from '@/elements/CustomCheckbox.vue'
import type { Todo } from '@/types/Todo'
import { formatDate } from '@/utils/formatDate'
import CustomButton from '@/elements/CustomButton.vue'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'toggle-complete', id: string): void
  (e: 'delete-todo', id: string): void
  (e: 'update-todo', todo: Todo): void
}>()

const toggleStatus = () => {
  emit('toggle-complete', props.todo.id ?? '')
}

const deleteItem = () => {
  emit('delete-todo', props.todo.id ?? '')
}
const updateItem = () => {
  emit('update-todo', props.todo ?? '')
}

const formattedDate = computed(() => formatDate(props.todo.date))
function getPriorityClasses(priority: string): string {
  const classes: Record<string, string> = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800',
  }

  return classes[priority] ?? classes['Low']
}
const priorityClasses = computed(() => getPriorityClasses(props.todo.priority))
</script>
