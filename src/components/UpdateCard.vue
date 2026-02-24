<script setup lang="ts">
const props = defineProps(["title", "date", "text"]);
</script>

<template>
  <div class="update-card">
    <div class="myflex">
      <h4>{{ props.title }}</h4>
      <span class="mydate">{{ props.date }}}</span>
    </div>
    <p>
      {{ props.text }}
    </p>
  </div>
</template>

<style scoped>
h4 {
  margin-top: 0.5em;
}

p {
  max-width: 26em;
}

.update-card {
  box-shadow: var(--dark) 0.3em 0.3em;
  padding-right: 0.5em;
  padding-bottom: 0.5em;
  margin-bottom: 0.5em;
}

.mydate {
  margin-top: 0.5em;
}

.myflex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
