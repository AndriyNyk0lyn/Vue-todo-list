<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    <select
      :id="id"
      :value="modelValue"
      @change="onChange"
      @blur="$emit('blur', $event)"
      :class="[
        'mt-1 block w-full pl-3 pr-10 py-2 text-base border shadow-sm sm:text-sm rounded-md bg-white',
        'focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
        errorMessage ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300',
      ]"
      :aria-invalid="!!errorMessage"
      :aria-describedby="errorMessage ? `${id}-error` : undefined"
      v-bind="$attrs"
    >
      <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
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
interface SelectOption {
  value: string | number
  text: string
}

interface SelectInputProps {
  modelValue: string | number
  options: SelectOption[]
  id: string
  label?: string
  placeholder?: string
  required?: boolean
  errorMessage?: string | null
}

withDefaults(defineProps<SelectInputProps>(), {
  label: '',
  placeholder: 'Please select an option',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'blur', event: FocusEvent): void
}>()

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>
