<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    <input
      :id="id"
      type="text"
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      :class="[
        'mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 sm:text-sm',
        'focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
        errorMessage ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300',
      ]"
      :aria-invalid="!!errorMessage"
      :aria-describedby="errorMessage ? `${id}-error` : undefined"
      v-bind="$attrs"
    />
    <p
      v-if="errorMessage"
      :id="`${id}-error`"
      :data-testid="`${id}-error`"
      class="mt-1 text-sm text-red-600"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface TextInputProps {
  modelValue: string
  id: string
  label?: string
  placeholder?: string
  required?: boolean
  errorMessage?: string | null
}

withDefaults(defineProps<TextInputProps>(), {
  label: '',
  placeholder: '',
  required: false,
  errorMessage: null,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur', event: FocusEvent): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>
