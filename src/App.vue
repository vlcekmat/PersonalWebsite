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
        <RouterLink to="/competitions">Competitions</RouterLink>
        <RouterLink to="/exercises">Exercises</RouterLink>
        <RouterLink to="/guestbook">Guestbook</RouterLink>
      </nav>
    </div>

    <div class="content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  font-size: large;
  width: 100%;
}

.navigation {
  display: flex;
  gap: 2em;
  border-bottom: var(--dark) solid 0.3em;
  padding-bottom: 0.5em;
  flex-wrap: wrap;
}

@media screen and (max-width: 750px) {
  .navigation {
    flex-direction: column;
    gap: 1em;
    align-items: center;
  }

  .navbar h1 {
    text-align: center;
  }
}
</style>
