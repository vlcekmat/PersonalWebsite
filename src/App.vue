<script setup lang="ts"></script>

<template>
  <div class="mainContainer">
    <div class="navbar">
      <h1>MarlaSite</h1>
      <p>
        Welcome to my personal website! My name's Marladian and I am a software engineering student who likes building websites the old way.
      </p>
    <nav class="navigation">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/gallery">Photo Gallery</RouterLink>
    </nav>
    </div>

    <div class="content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped></style>
