<template>
    <div class="grid-photo">
        <img :src="props.imgPath" class="galleryPhoto"></img>
        <div class="info-box">
            <h3>Photo Name</h3>
            <dl>
                <dt>ISO</dt>
                <dd>200</dd>

                <dt>Shutter Speed</dt>
                <dd>220</dd>

                <dt>Aperature</dt>
                <dd>1/4</dd>
            </dl>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['imgPath'])
</script>