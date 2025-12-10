<script setup lang="ts">
import { SearchLoaded } from '@/stores/searchStore/searchStates'
import { useSearchStore } from '@/stores/searchStore/searchStore'
import { VideoOff } from 'lucide-vue-next'

const searchStore = useSearchStore()
</script>

<template>
  <div>
    <div
      v-for="result in searchStore.state instanceof SearchLoaded ? searchStore.state.videos : []"
      :key="result.id"
      class="flex flex-row items-center justify-between gap-12 p-2 border-b-1 rounded-md"
    >
      <a target="_blank" :href="result.src ?? ''" class="hover:underline">{{ result.title }}</a>
      <VideoOff v-if="!result.src" class="size-4 text-muted-foreground" />
    </div>
  </div>
</template>
