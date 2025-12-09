<script setup lang="ts">
import { SearchLoaded } from '@/stores/searchStore/searchStates'
import { useSearchStore } from '@/stores/searchStore/searchStore'

const searchStore = useSearchStore()
</script>

<template>
  <div class="search-results">
    <div
      v-for="result in searchStore.state instanceof SearchLoaded ? searchStore.state.videos : []"
      :key="result.id"
    >
      <a :href="`https://conanclassic.com${result.slug}`">{{ result.title }}</a>
    </div>
  </div>
</template>

<style scoped>
.search-results {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.search-results > div {
  padding: 14px;
  border-bottom: 1px solid #ccc;
}

a {
  font-size: 24px;
  font-family: sans-serif;
  text-decoration: none;
  color: #372000;
}

a:visited {
  color: #a96300;
}
</style>
