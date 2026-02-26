<script setup lang="ts">

</script>

<template>
  <div class="links-section">
    <h2>Links</h2>
    <dl class="links-list">
      <dt>My GitHub</dt>
      <dd><a href="https://github.com/vlcekmat">
        github.com/vlcekmat
      </a></dd>

      <dt>List-Me.com website directory</dt>
      <dd><a href="https://list-me.com">
        list-me.com
      </a></dd>

      <dt>My friend's digital garden (only in Czech)</dt>
      <dd>
        <a href="https://www.petrkudrnovsky.cz">
          https://www.petrkudrnovsky.cz
        </a>
      </dd>
    </dl>
  </div>
</template>

<style scoped>
.links-list {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

dt {
  font-weight: bold;
  color: var(--accent);
}

dd {
  margin-left: 1em;
  margin-bottom: 1em;
}


</style>