<script setup lang="ts">
import Button from '@/shadcn/components/ui/button/Button.vue'
import Input from '@/shadcn/components/ui/input/Input.vue'
import { Spinner } from '@/shadcn/components/ui/spinner'
import { SearchLoading } from '@/stores/searchStore/searchStates'
import { useSearchStore } from '@/stores/searchStore/searchStore'
import { ref } from 'vue'

const searchStore = useSearchStore()

const searchQuery = ref('')

const handleSearch = () => {
  searchStore.search(searchQuery.value)
}
</script>

<template>
  <div class="flex flex-row items-center justify-center gap-2 sticky top-4">
    <Input
      @keyup.enter="handleSearch"
      type="text"
      v-model="searchQuery"
      placeholder="Search for a video"
      class="bg-background"
    />
    <Button variant="default" @click="handleSearch"
      ><Spinner v-if="searchStore.state instanceof SearchLoading" /> Search</Button
    >
  </div>
</template>
