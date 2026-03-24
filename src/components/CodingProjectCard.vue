<script setup lang="ts">

</script>

<template>
  <div class="coding-project-card">
      <h3>Project Name</h3>
      <p>A brief description of the project goes here. It can be a few sentences long and should give an overview of what the project is about.</p>
      <a class="view-project-link" href="#">View Project</a>
      <img class="project-preview-image" src="/placeholder.png" />

  </div>
</template>

<style scoped>
.coding-project-card {
  background-color: var(--darkest);
  border-radius: 8px;
  padding: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 1em;
}

.project-preview-image {
  max-width: 20em;
  height: auto;
  margin-top: 1em;
  border-radius: 4px;
}

.view-project-link {
  display: inline-block;
  margin-top: 1em;
  color: var(--accent);
  text-decoration: none;
  font-weight: bold;
}

.view-project-link:hover {
  color: var(--light);
}




</style>