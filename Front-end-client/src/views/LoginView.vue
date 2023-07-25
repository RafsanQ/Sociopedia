<script setup>
import { ref } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { ThemeProvider } from 'vue3-styled-components'
import { themeSettings } from '../theme.js';
import { useCentralStore } from '../stores';


import Navbar from "./Navbar.vue";
import { 
  Card
} from "../components/stylizedFormComponents.js";




// Media query to check screen size
const isLargeScreen = useMediaQuery('(min-width: 800px)')

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



</script>

<template>
  <div>
    <Navbar :isLoginPage="true"/>

    <ThemeProvider :theme="{
        neutralLight: neutralLight,
        dark: dark,
        primaryLight: primaryLight,
        primary: primary,
        primaryDark: primaryDark,
        background: background,
        alt: alt,
        fontColor: fontColor
    }">
      <Card>
        
      </Card>


    </ThemeProvider>

  </div>
</template>

<style>

</style>
