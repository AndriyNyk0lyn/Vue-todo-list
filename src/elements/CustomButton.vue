<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
    class="inline-flex justify-center cursor-pointer items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <span v-if="loading">Wait...</span>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
export type Variant = 'primary' | 'secondary' | 'danger'
const props = withDefaults(
  defineProps<{
    variant?: Variant
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
  },
)

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const variantClasses = {
  primary: [
    'border-transparent',
    'text-white',
    'bg-indigo-600',
    'hover:bg-indigo-700',
    'focus:ring-indigo-500',
  ],
  secondary: [
    'border-gray-300',
    'text-gray-700',
    'bg-white',
    'hover:bg-gray-50',
    'focus:ring-indigo-500',
  ],
  danger: [
    'border-transparent',
    'text-white',
    'bg-red-600',
    'hover:bg-red-700',
    'focus:ring-red-500',
  ],
}

const buttonClasses = computed(() => variantClasses[props.variant])
</script>
