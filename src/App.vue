<script setup lang="ts">
import SearchBar from './components/SearchBar.vue'
import SearchResults from './components/SearchResults.vue'
</script>

<template>
  <div class="app-container">
    <img
      width="100"
      height="100"
      src="@/assets/hair.png"
      alt="Conan Classics Search"
      class="logo"
    />
    <SearchBar />
    <SearchResults />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  min-height: 100vh;
}
</style>
