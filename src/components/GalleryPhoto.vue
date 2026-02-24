<template>
    <div class="grid-photo">
        <img :src="props.imgPath" class="galleryPhoto"></img>
        <div class="info-box">
            <h3>{{ props.title }}</h3>
            <dl>
                <dt>ISO</dt>
                <dd>{{ props.iso }}</dd>

                <dt>Shutter Speed</dt>
                <dd>{{ props.ss }}</dd>

                <dt>Aperature</dt>
                <dd>{{ props.ape }}</dd>
            </dl>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps(['imgPath', 'title', 'iso', 'ss', 'ape'])
</script>