<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { Photo } from "@/model/Photo";
import GalleryPhoto from "../components/GalleryPhoto.vue";
import { ref } from "vue";
import { onMounted } from "vue";

const photos = ref<Photo[]>([]);

onMounted(async () => {
  try {
    const response = await fetch("/galleryMetadata.json");
    photos.value = await response.json();
  } catch (error) {
    console.error("Error while loading the gallery metadata:", error);
  }
});
</script>

<template>
  <h2>Photo Gallery</h2>
  <p>
    Photography is a big interest of mine. I have been taking pictures since I
    was a small kid. It has always fascinated me how we can simply capture any
    fleeting moment and freeze it in time. See? That's me when I was about 13
    already holding a camera in my hand!
  </p>
  <br>
  <img
    class="personalPhoto"
    src="../assets/images/newYorkPhoto.png"
    alt="13 year old me holding a camera"
  />
  <br>

  <p>
    Below you will find some of my photographs taken from around the world. I
    also included some meta information — ISO, shutter speed and aperature. If
    you'd like to see more of them, feel free to visit my photography instagram
    account: <a href="https://www.instagram.com/somewitw/">@somewitw</a>
  </p>

  <div class="photoGallery">
    <GalleryPhoto
      v-for="photo in photos"
      :key="photo?.id"
      :imgPath="photo?.path"
      :title="photo?.title"
      :ss="photo?.shutterSpeed"
      :iso="photo?.iso"
      :ape="photo?.aperture"
    />
  </div>
</template>
