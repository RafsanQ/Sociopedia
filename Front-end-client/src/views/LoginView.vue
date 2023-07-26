<script setup>
import { ref } from "vue";
import { useMediaQuery } from "@vueuse/core";

import { ThemeProvider } from 'vue3-styled-components'
import { themeSettings } from '../theme.js';
import { useCentralStore } from '../stores';


import Navbar from '../components/Navbar/Navbar.vue';
import RegisterForm from "../components/Forms/RegisterForm.vue";
import SignInFOrm from "../components/Forms/signInFOrm.vue";

import {
  Background
} from '../components/stylizedComponents.js';




// Media query to check screen size
const isLargeScreen = useMediaQuery('(min-width: 800px)')

// Store
const store = useCentralStore();


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

</script>

<template>
  <div>
    <Navbar :isLoginPage="true"/>

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
        <SignInFOrm v-show="showLoginForm">
          
        </SignInFOrm>

        <RegisterForm v-show="!showLoginForm">

        </RegisterForm>

        <!-- <p @click="showLoginForm = !showLoginForm">Create an account</p> -->
      </Background>

    </ThemeProvider>

  </div>
</template>

<style>

</style>
