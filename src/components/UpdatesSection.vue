<script setup lang="ts">
import type { Update } from "@/model/Update";
import UpdateCard from "./UpdateCard.vue";
import { onMounted, ref } from "vue";

const updates = ref<Update[]>([]);

onMounted(async () => {
  try {
    const response = await fetch("/updates.json");
    updates.value = await response.json();
  } catch (error) {
    console.error("Error while loading the updates", error);
  }
});
</script>

<template>
  <h3>Updates</h3>
  <ol class="updates-container">
    <UpdateCard
      v-for="update in updates"
      :key="update.id"
      :title="update.title"
      :date="update.date"
      :text="update.text"
    />
  </ol>
</template>

<style scoped>
h3 {
  border-bottom: var(--accent) 0.3em solid;
  padding-right: 15em;
  padding-bottom: 0.5em;
}

.updates-container {
  max-height: 30em;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

@media  screen and (max-width: 450px) {
  h3 {
    padding-right: 0;
  }
}
</style>
