<script setup lang="ts">
import { useSearchStore } from '@/stores/searchStore/searchStore'
import { ref } from 'vue'

const searchStore = useSearchStore()

const searchQuery = ref('')

const handleSearch = () => {
  searchStore.search(searchQuery.value)
}
</script>

<template>
  <div class="search-bar">
    <input type="text" v-model="searchQuery" placeholder="Search for a video" />
    <button @click="handleSearch">Search</button>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  top: 20px;
  position: sticky;
}

input {
  width: 100%;
  padding: 13px 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
}

button {
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  background-color: #ff9b0e;
  color: #fff;
}
</style>
