<script setup>

import { ref } from "vue";
import { ThemeProvider } from 'vue3-styled-components'
import { themeSettings } from '../../theme.js';
import { useCentralStore } from '../../stores';

import ProfileImageWidget from "./ProfileImageWidget.vue";
import MediaUploadFieldInput from "../Forms/MediaUploadFieldInput.vue";

import {
    WidgetWrapper,
    StyledInput
} from './stylizedComponents.js';

// For Routing stuff and refresh
import { useRouter } from 'vue-router';
const router = useRouter()

// Store
const store = useCentralStore();
const user = store.user;

// Theme settings
const themeProperties = ref(themeSettings(store.mode));
let neutralLight = themeProperties.value.pallete.neutral.light;
let neutralDark = themeProperties.value.pallete.neutral.dark;
let primaryLight = themeProperties.value.pallete.primary.light;
let primary = themeProperties.value.pallete.primary.main;
let primaryDark = themeProperties.value.pallete.primary.dark;
let background = themeProperties.value.pallete.background.default;
let alt = themeProperties.value.pallete.background.alt;

let fontColor = themeProperties.value.pallete.fontColor;


let media = ref(null);
function getMedia(value){
    media.value = value;
}

</script>


<template>
    <div class="container">
        <ProfileImageWidget :email="user.email" size="60px"/>
        <textarea class="postText" placeholder="What's on your mind..." ></textarea>
    </div>
    <br>
    <div class="mediaInput">
        <MediaUploadFieldInput width="95%" @inputMedia="getMedia" />
    </div>


    
    
    
</template>



<style scoped>
.container{
    text-align: left;
}
.postText{
    display: inline;
    background: v-bind(neutralLight);
    border-radius: 9px;
    gap: 3rem;
    
    margin: 0 1rem 0 1rem;
    float: left;
    text-align: left;
    padding: clamp(0.4rem, 0.4rem, 0.1rem);
    width: clamp(80%, 80%, 30%);
    color: v-bind(fontColor);
    resize: none;
}
.mediaInput{
    align-items: center;
    text-align: center;
    margin: auto;
    width: 100%;
}
</style>
