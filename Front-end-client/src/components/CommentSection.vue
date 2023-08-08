<script setup>
import { ref } from "vue";
import { useCentralStore } from '../stores';
import { useToast } from 'vue-toast-notification';
import { themeSettings } from '../theme.js';
import ProfileImageWidget from "./Widgets/ProfileImageWidget.vue";


// Store
const store = useCentralStore();
const user = store.user;

// Theme Stuff
const themeProperties = ref(themeSettings(store.mode));

let neutralLight = themeProperties.value.pallete.neutral.light;
let dark = themeProperties.value.pallete.neutral.dark;
let primaryLight = themeProperties.value.pallete.primary.light;
let primary = themeProperties.value.pallete.primary.main;
let primaryDark = themeProperties.value.pallete.primary.dark;
let background = themeProperties.value.pallete.background.default;
let alt = themeProperties.value.pallete.background.alt;
let fontColor = themeProperties.value.pallete.fontColor;



let text = "";

</script>

<template>
    <div class="commentSection">
        <ProfileImageWidget class="profilePicture" :email="user.email" size="40px"/>
        <input class="text" v-model="text">
        <v-btn class="sendButton" rounded="xl" :color="primary">
            Send
        </v-btn>
    </div>
</template>


<style scoped>
.profilePicture{
    margin: 0.5% 2%;
    float: left;
}
.sendButton{
    display: inline;
    margin: 0.7%;
    width: 15%;
    float: right;
    color: white;
}
.text{
    background-color: v-bind(neutralLight);
    width: 70%;
    height: 3rem;
    resize: none;
    border-radius: 1.5rem;
    padding: 2%;
    float: center;
    margin: 0% 1% 0% 1%;
}
</style>