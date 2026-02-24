<script setup lang="ts">
import RetroOverlay from "./components/RetroOverlay.vue";
</script>

<template>
  <RetroOverlay />
  <div class="mainContainer">
    <div class="navbar">
      <h1>MarlaSite</h1>
      <nav class="navigation">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/gallery">Photo Gallery</RouterLink>
      </nav>
    </div>

    <div class="content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped></style>
