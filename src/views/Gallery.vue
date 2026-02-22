<script setup>
import GalleryPhoto from '../components/GalleryPhoto.vue';

</script>

<template>
    <h2>Photo Gallery</h2>
    <p>
        Photography is a big interest of mine. I have been taking pictures since I was a small kid. It has always fascinated me how we can simply capture any fleeting moment and freeze it in time. See? That's me when I was about 13 already holding a camera in my hand!
    </p>
    <img class="personalPhoto" src="../assets/images/newYorkPhoto.png" alt="13 year old me holding a camera"/>

    <p>
        Below you will find some of my photographs taken from around the world. I also included some meta information — ISO, shutter speed and aperature. If you'd like to see more of them, feel free to visit my photography instagram account: <a href="https://www.instagram.com/somewitw/">@somewitw</a>
    </p>

    <div class="photoGallery">
        <GalleryPhoto imgPath="/images/pragueStaraSynagoga.jpg"/>
        <GalleryPhoto imgPath="/images/prague1.jpg"/>
        <GalleryPhoto imgPath="/images/manchester.JPG" />
        <GalleryPhoto imgPath="/images/bruges.jpg"/>
    </div>
</template>