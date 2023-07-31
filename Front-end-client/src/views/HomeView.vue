<script setup>
import { ref } from "vue";
import { useMediaQuery } from "@vueuse/core";

import { ThemeProvider } from 'vue3-styled-components'
import { themeSettings } from '../theme.js';
import { useCentralStore } from '../stores';


import RegisterForm from "../components/Forms/RegisterForm.vue";
import LoginForm from "../components/Forms/LoginForm.vue";

import {
  Background
} from '../components/stylizedComponents.js';

// For Routing stuff and refresh
import { useRouter } from 'vue-router';
const router = useRouter()


// Store
const store = useCentralStore();


// Theme settings
const themeProperties = ref(themeSettings(store.mode));


let neutralLight = themeProperties.value.pallete.neutral.light;
let dark = themeProperties.value.pallete.neutral.dark;
let primaryLight = themeProperties.value.pallete.primary.light;
let primary = themeProperties.value.pallete.primary.main;
let primaryDark = themeProperties.value.pallete.primary.dark;
let background = themeProperties.value.pallete.background.default;
let alt = themeProperties.value.pallete.background.alt;

let fontColor = themeProperties.value.pallete.fontColor;



// Check if Signed in
const user = store.user;
const token = store.token;

if(!user && !token){
  router.push('/')    // If not redirect to login page
}

</script>

<template>
  <ThemeProvider :theme="{
    neutralLight,
    dark,
    primaryLight,
    primary,
    primaryDark,
    background,
    alt,
    fontColor
  }">
    <Background>
      
    </Background>
  </ThemeProvider>
</template>

<style>

</style>
