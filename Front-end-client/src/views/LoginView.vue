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


// Media query to check screen size
const isLargeScreen = useMediaQuery('(min-width: 800px)')

// Store
const store = useCentralStore();

const user = store.user;
const token = store.token;

if(user && token){
  router.push('/home')
}

// Theme settings
const themeProperties = ref(themeSettings(store.mode));


let neutralLight = themeProperties.value.pallete.neutral.light;
let neutralDark = themeProperties.value.pallete.neutral.da;
let primaryLight = themeProperties.value.pallete.primary.light;
let primary = themeProperties.value.pallete.primary.main;
let primaryDark = themeProperties.value.pallete.primary.dark;
let background = themeProperties.value.pallete.background.default;
let alt = themeProperties.value.pallete.background.alt;

let fontColor = themeProperties.value.pallete.fontColor;

// Toggle to show the login or register forms
const showLoginForm = ref(true);

// This function will be sent as a prop to the forms to be called when changing the form.
const changeForm = () => {
  showLoginForm.value = !showLoginForm.value;
}

</script>

<template>
  <div>
    

    <ThemeProvider :theme="{
        neutralLight: neutralLight,
        neutralDark: neutralDark,
        primaryLight: primaryLight,
        primary: primary,
        primaryDark: primaryDark,
        background: background,
        alt: alt,
        fontColor: fontColor
    }">
      <Background>
        <LoginForm v-show="showLoginForm" :changeForm="changeForm" />
          

        <RegisterForm v-show="!showLoginForm" :changeForm="changeForm" />


      </Background>

    </ThemeProvider>

  </div>
</template>

<style>

</style>
