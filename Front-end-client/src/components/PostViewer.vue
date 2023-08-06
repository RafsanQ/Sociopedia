<script setup>

import { ref } from "vue";
import { themeSettings } from '../theme.js';
import { useCentralStore } from '../stores';
import { useToast } from 'vue-toast-notification';

import ProfileImageWidget from "./Widgets/ProfileImageWidget.vue";
import MediaUploadFieldInput from "./Forms/MediaUploadFieldInput.vue";

import {
    CentralCard
} from './stylizedComponents.js';


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


const props = defineProps({
    postProperties: {
        Type: Object
    }
})



</script>


<template>
    <CentralCard>
        <div class="userInfo">
            <ProfileImageWidget class="profilePicture" :email="postProperties.userEmail" size="40px"/>
            <h3 class="username"> {{ postProperties.firstName + ' ' + postProperties.lastName }}</h3>
        </div>
        <br>
        <div class="postText">
            <p>Dummy Text</p>
        </div>
        <div>

        </div>
        
        
    </CentralCard>
</template>



<style scoped>
.userInfo {
    display: block;
    text-align: right;
    align-items: left;
}

.profilePicture{
    margin-right: 2%;
    float: left;
}

.username{
    float: left;
}

.postText{
    display: block;
    padding: 3% 1%;
}

</style>
