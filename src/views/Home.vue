<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import UpdatesSection from "@/components/UpdatesSection.vue";
import LinksSection from "@/components/LinksSection.vue";
import WebringsSection from "@/components/WebringsSection.vue";
</script>

<template>
  <h2>Home</h2>
  <div class="two-column-grid">
    <div>
      <p class="typed">
        Hello dear web traveler, welcome to my personal website! Why don't you
        take a rest and explore this niche corner of the internet for a bit? As
        you may have noticed, I am a big fan of the 32bit retro look, therefore
        I try to stylize this page kind of like an old CRT monitor. It is still
        work in progress, but I'm quite determined to make this place much
        cooler!
      </p>
      <br>
      <p class="typed">
        I made this page to share my interests - photographs, coding projects
        and other in a more authentic way than is possible on regular social
        media. It is also supposed to be an experimental site of sort, so expect
        a lot of random games, activities and hidden easter eggs around!
      </p>
      <br>
      <p class="typed links-to-fix typing">
        Since you read this all the way to here, why don't you sign my
        <a href="guestbook">guestbook</a>?
      </p>
    </div>

    <div>
      <UpdatesSection />
    </div>
  </div>

  <div class="two-column-grid bordered">
    <LinksSection />
    <WebringsSection/>
  </div>


</template>

<style scoped>
@media screen and (max-width: 730px) {
  .two-column-grid {
    display: flex;
    flex-direction: column;
  }
}
</style>
