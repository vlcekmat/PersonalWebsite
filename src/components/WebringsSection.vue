<script setup lang="ts">

import WebringComponent from "@/components/WebringComponent.vue";
</script>

<template>
  <div class="webrings-section">
    <h2>Webrings</h2>
    <WebringComponent
      :previous="'https://dreadheadhippy.space/'"
      :next="'https://skyhold.org/'"
      :webring-name="'ADHDMe Webring'"
      :webring-link="'https://skyhold.org/adhd/'"
    />
  </div>
</template>

<style scoped>

</style>