<!-- eslint-disable vue/no-parsing-error -->
<template>
    <div class="grid-photo">
        <img :src="props.imgPath" class="galleryPhoto"></img>
        <div class="info-box">
            <h3>{{ props.title }}</h3>
            <dl>
                <div>
                    <dt>ISO</dt>
                    <dd>{{ props.iso }}</dd>
                </div>
                <div>
                    <dt>Shutter</dt>
                    <dd>{{ props.ss }}</dd>
                </div>
                <div>
                    <dt>Aperture</dt>
                    <dd>{{ props.ape }}</dd>
                </div>
            </dl>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps(['imgPath', 'title', 'iso', 'ss', 'ape'])
</script>