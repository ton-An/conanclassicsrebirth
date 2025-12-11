<script setup lang="ts">
import FaqSheet from './components/FaqSheet.vue'
import SearchBar from './components/SearchBar.vue'
import SearchResults from './components/SearchResults.vue'
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-8 p-4 min-h-screen">
    <div class="flex flex-col items-center justify-center gap-4">
      <img
        width="100"
        height="100"
        src="@/assets/hair.png"
        alt="Conan Classics Search"
        class="logo"
      />

      <h1 class="text-2xl font-medium">Conan Classics Search</h1>
    </div>
    <SearchBar />
    <SearchResults />
    <FaqSheet />
  </div>
</template>
