<template>
  <label class="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="onChange"
      class="sr-only peer"
      v-bind="$attrs"
    />
    <span
      class="w-5 h-5 inline-block border-2 rounded border-gray-300 mr-2 transition-colors duration-200 ease-in-out peer-checked:bg-indigo-600 peer-checked:border-indigo-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-indigo-400"
    >
      <CheckIcon v-if="modelValue" />
    </span>
    <span v-if="label" class="text-gray-700 select-none">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import CheckIcon from '@/components/icons/CheckIcon.vue'

interface CheckboxProps {
  modelValue: boolean
  id: string
  label?: string
}

withDefaults(defineProps<CheckboxProps>(), {
  label: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>
