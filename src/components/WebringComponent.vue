<script setup lang="ts">
const props = defineProps([
    "previous",
    "next",
    "webringName",
    "webringLink"
    ]
);
</script>

<template>
  <div class="webring-component">
    <a class="navigation-arrow" :href="props.previous"><</a>
    <h4><a class="webring-link" :href="props.webringLink">{{props.webringName}}</a></h4>
    <a class="navigation-arrow" :href="props.next">></a>
  </div>
</template>

<style scoped>
.webring-component {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.navigation-arrow {
  font-size: 1.5em;
  color: var(--accent);
  cursor: pointer;
}

.navigation-arrow:hover {
  color: var(--light);
}

.webring-link {
  color: var(--accent);
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.webring-link:hover {
  color: var(--light);
}

</style>