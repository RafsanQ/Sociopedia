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



</script>


<template>
    <CentralCard>
        <div class="container">
            <ProfileImageWidget class="profilePicture" :email="user.email" size="30px"/>
            <h3 class="username">{{ user.firstName + ' ' + user.lastName }}</h3>
        </div>
        <div>
            
        </div>
        
        
    </CentralCard>
</template>



<style scoped>
.container {
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

</style>
