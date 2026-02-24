<template>
  <div class="crt-overlay">
    <div class="scanlines"></div>
  </div>
</template>

<style scoped>
.crt-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
  background: radial-gradient(
    circle,
    rgba(18, 16, 16, 0) 50%,
    rgba(0, 0, 0, 0.4) 90%,
    rgba(0, 0, 0, 0.8) 100%
  );
}

.scanlines {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0) 50%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0.2)
  );
  background-size: 100% 4px;
  animation: flicker 0.15s infinite;
}

@keyframes flicker {
  0% {
    opacity: 0.95;
  }
  50% {
    opacity: 0.85;
  }
  100% {
    opacity: 0.95;
  }
}
</style>
