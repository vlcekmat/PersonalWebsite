<script setup lang="ts">
const canvas = document.getElementById('canvas');
//const ctx = canvas?.getContext('2d');

//ctx.fillRect(10, 10, 150, 100);
</script>

<template>
  <div class="pixelart-editor">
    <canvas id="canvas" class="canvas"></canvas>
  </div>
</template>

<style scoped>
  .pixelart-editor {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .canvas {
    border: 1px solid var(--dark);
    image-rendering: pixelated;
    width: 100%;

  }

</style>