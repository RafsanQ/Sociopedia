<script setup>

import { ref } from "vue";
import { ThemeProvider } from 'vue3-styled-components'
import { themeSettings } from '../../theme.js';
import { useCentralStore } from '../../stores';
import { useToast } from 'vue-toast-notification';

import ProfileImageWidget from "./ProfileImageWidget.vue";
import MediaUploadFieldInput from "../Forms/MediaUploadFieldInput.vue";


import {
    CentralCard
} from '../stylizedComponents.js';

import {
    StyledSubmitButton
} from '../Forms/stylizedFormComponents';

// For Routing stuff and refresh
import { useRouter } from 'vue-router';
const router = useRouter()

const toast = useToast();

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


// Form properties
let text = "";

// To catch the uploaded media
let media = null;
function getMedia(value){
    media.value = value;
}

// Input Type selector
let inputType = ref('image');
function selectInputType(newValue){
    inputType.value = newValue;
    media = null;
}

async function handlePost(){
    try{
        const response = await fetch("http://localhost:3001/posts/create",{
            method: 'POST',
            headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${store.token}`
                },
            body: JSON.stringify({
                userId: user._id,
                text,
                media
            })
        })

        if(response.status == 200 || response.status == 201){
            toast.success("Post Created");

            // Wait 0.1s
            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(100);

            // Refresh
            router.go();
        }

        else if(response.status == 403){
            toast.error("Invalid Token");
        }

    }catch(error){
        console.log(error);
    }
}

</script>


<template>
    <CentralCard>
        <div class="container">
            <ProfileImageWidget class="profilePicture" :email="user.email" size="80px"/>
            <textarea class="postText" v-model="text" placeholder="What's on your mind..." ></textarea>
        </div>
        <br>
        <div class="mediaInput">
            <MediaUploadFieldInput :inputType="inputType" width="95%" @inputMedia="getMedia" />
        </div>
        <div class="buttons">
            <v-btn id="imageButton" prepend-icon="image" :variant="inputType == 'image' ? 'tonal':'plain'" @click="selectInputType('image')">
                Image
            </v-btn>
            <v-btn id="videoButton" prepend-icon="movie" :variant="inputType == 'video' ? 'tonal':'plain'" @click="selectInputType('video')">
                Video
            </v-btn>
            <v-btn id="audioButton" prepend-icon="mic" :variant="inputType == 'audio' ? 'tonal':'plain'" @click="selectInputType('audio')">
                Audio
            </v-btn>
            <StyledSubmitButton class="submitButton" @click="handlePost">
                Post
            </StyledSubmitButton>
        </div>
    </CentralCard>
</template>



<style scoped>

.buttons{
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    margin-top: 1rem;
}

.buttons .submitButton{
    max-width: 25%;
    margin: 0;
    color: white;
}

.container{
    text-align: left;
    padding-top: 2%;
}

.profilePicture{
    margin: 1% 2%;
}

.postText{
    display: inline;
    background: v-bind(neutralLight);
    border-radius: 9px;
    gap: 3rem;
    
    margin: 0.5rem 1rem 0 1rem;
    float: left;
    text-align: left;
    padding: clamp(0.4rem, 0.4rem, 0.1rem);
    padding-top: 3%; 
    padding-left: 2%;
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
