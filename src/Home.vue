<script setup lang="ts">
import SearchBar from './components/SearchBar.vue'
import SearchResults from './components/SearchResults.vue'
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-8 p-4 min-h-screen">
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
