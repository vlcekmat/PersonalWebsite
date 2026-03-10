<script setup lang="ts">
import RetroOverlay from "./components/RetroOverlay.vue";

const typeSpeed = 5;

async function typeAllParagraphs() {
  // find all elements marked "links-to-fix"
  const paragraphsWithLinks: any = document.getElementsByClassName("links-to-fix");

  const innerHtmlMap: Map<HTMLElement, string> = new Map();

  for (const p of paragraphsWithLinks) {
    innerHtmlMap.set(p, p.innerHTML);
    p.innerHTML = p.innerText;
  }

  const paragraphs: any =
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

    p.classList.remove("typing");
  }

  // restore the innerHTML of the paragraphs with links
  for (const [p, html] of innerHtmlMap.entries()) {
    p.innerHTML = html;
  }
}
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
        <RouterLink to="/codingProjects">Coding Projects</RouterLink>
        <RouterLink to="/pixelart">Pixelart Editor</RouterLink>
        <RouterLink to="/guestbook">Guestbook</RouterLink>
      </nav>
    </div>

    <div class="content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped></style>
