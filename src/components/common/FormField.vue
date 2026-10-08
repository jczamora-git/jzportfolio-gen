<script setup lang="ts">
defineProps<{
  label?: string
  id?: string
  required?: boolean
  optional?: boolean
  help?: string
  error?: string
}>()
</script>

<template>
  <div class="space-y-1.5">
    <div v-if="label" class="flex items-center justify-between">
      <label 
        :for="id" 
        class="block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {{ label }}
        <span v-if="required" class="text-rose-500 font-bold ml-0.5">*</span>
      </label>
      <span v-if="optional" class="text-xs text-slate-400 dark:text-slate-500 font-normal">
        Optional
      </span>
    </div>

    <slot />

    <p v-if="error" class="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1 mt-1">
      {{ error }}
    </p>
    <p v-else-if="help" class="text-xs text-slate-500 dark:text-slate-400 leading-normal">
      {{ help }}
    </p>
  </div>
</template>
