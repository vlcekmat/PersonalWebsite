<script setup lang="ts">
const props = defineProps(['name', 'datetime', 'text']);
</script>

<template>
  <div class="guest-book-message-card">
    <h6>{{ props.name }}</h6>
    <span class="datetime">{{ props.datetime }}</span>
    <p>{{props.text}}</p>
  </div>

</template>

<style scoped>
.guest-book-message-card {
  padding: 1em 1em 1em 0em;

  box-shadow: var(--dark) 0.3em 0.3em;

  margin-bottom: 1em;
}


</style>
