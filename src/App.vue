<script setup lang="ts">
import RetroOverlay from "./components/RetroOverlay.vue";

const typeSpeed = 5;

async function typeAllParagraphs() {
  const paragraphs: HTMLAllCollectionOf<Element> =
    document.getElementsByClassName("typed");

  for (const p of paragraphs) {
    p.style.opacity = "0";
  }

  for (const p of paragraphs) {
    const fullText = p.innerText;
    p.innerText = "";
    p.style.opacity = "1";
    p.classList.add("typing");

    for (let i = 0; i < fullText.length; i++) {
      p.innerText += fullText.charAt(i);
      await new Promise((res) => setTimeout(res, typeSpeed));
    }

    p.classList.remove("typing"); // Odstraní kurzor po dopsání
  }
}

// Spustit po načtení stránky
window.onload = typeAllParagraphs;
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
