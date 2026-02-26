<script setup lang="ts"></script>
<template>
  <h2>About</h2>

  <div class="my-flex">
    <div class="paragraph-section">
      <p class="typed links-to-fix">
        My name is Matěj (Marladian my nickname, hence the website name.
        Original, I know.), I'm a 24 year old software engineering student from
        Prague, Czech Republic. The one word I'd use to describe myself is
        "scatterbrain". I'm doing everything and nothing. Jack of all traits,
        master of none I guess haha. Since I was a kid, I've been doing theater,
        I play guitar, develop games, make pixelart, I dance ballroom and latin
        and of course, I code. I code a lot. I do it in school, at work and even
        in my free time, hence this site, which I first started as a way to
        practice my vue.js skills.
      </p>

      <br />

      <p class="typed links-to-fix">
        I was also inspired by the
        <a href="https://32bit.cafe/">32bit-cafe</a> website. The idea of a
        decentralized web focused on self expression and freedom rather than
        monetary gain really resonated with me and I just want to be a part of
        that. I was born in 2001, so I experienced the time of the "old
        internet" just a little bit, but I still miss the times of flash games
        and crazy scrap book like websites. It feels like nowdays most websites
        look all the same. I call it "minimalism hell". All my friends know
        I could rant about that for hours.
      </p>

      <br />

      <p class="typed links-to-fix">
        Also if you'd like to exchange website links or just send me a message,
        feel free to send me an email:
        <a href="mailto:vlcekmat@seznam.cz">vlcekmat@seznam.cz</a> or you can
        leave a message in the <a href="/guestbook">guestbook</a>!
      </p>
    </div>

    <div class="image-section">
      <img
        class="profile"
        src="/profile.png"
        alt="Profile picture of a pixelart version of me"
      />
    </div>
  </div>
</template>

<style scoped>
.paragraph-section{
  max-width: 50em;
}

.my-flex {
  display: flex;
  flex-direction: row;
  gap: 5em;
  justify-content: space-between;
}

.profile {
  border: 2px solid var(--light);

  transition: all 0.25s ease-out;
  position: relative;
  z-index: 1;
  margin-top: 1em;
  margin-bottom: 1em;

  max-width: 30em;
  aspect-ratio: 1 / 1;
}

.image-section {
  width: 80em;
}

.profile:hover {
  transform: scale(1.05);
  box-shadow: 0px 0px 10px var(--light);
}

@media screen and (max-width: 950px) {
  .my-flex {
    flex-direction: column;
    gap: 3em;
  }

  .image-section {
    width: 80%;
    display: flex;
    justify-content: center;
  }
}
</style>
