<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog id="confirm-popup" as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/30" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                {{ title }}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-600">
                  {{ message }}
                </p>
              </div>

              <div
                class="mt-5 sm:mt-6 flex flex-col sm:flex-row-reverse sm:space-x-2 space-y-2 sm:space-y-0 sm:space-x-reverse"
              >
                <CustomButton
                  :type="'button'"
                  :variant="confirmVariant"
                  @click="confirmAction"
                  class="w-full sm:w-auto"
                  :loading="loading"
                >
                  {{ confirmText }}
                </CustomButton>
                <CustomButton
                  :type="'button'"
                  :variant="'secondary'"
                  @click="closeModal"
                  class="w-full sm:w-auto"
                >
                  {{ cancelText }}
                </CustomButton>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import CustomButton from '@/elements/CustomButton.vue'
import type { Variant } from '@/elements/CustomButton.vue'

interface ConfirmPopupProps {
  isOpen: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  confirmVariant?: Variant
  loading?: boolean
}

withDefaults(defineProps<ConfirmPopupProps>(), {
  title: 'Confirm Action',
  message: 'Are you sure you want to proceed?',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  confirmVariant: 'danger',
})

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

function closeModal() {
  emit('cancel')
  emit('update:isOpen', false)
}

function confirmAction() {
  emit('confirm')
}
</script>
