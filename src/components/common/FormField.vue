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
        class="block text-xs sm:text-sm font-semibold text-[#181824] dark:text-[#F3F4F8]"
      >
        {{ label }}
        <span v-if="required" class="text-rose-500 font-bold ml-0.5">*</span>
      </label>
      <span v-if="optional" class="text-[11px] text-[#737385] dark:text-[#9496A8] font-normal">
        Optional
      </span>
    </div>

    <slot />

    <p v-if="error" class="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1 mt-1">
      {{ error }}
    </p>
    <p v-else-if="help" class="text-[11px] sm:text-xs text-[#737385] dark:text-[#9496A8] leading-normal">
      {{ help }}
    </p>
  </div>
</template>
