<script setup>
import Navbar from '../components/Navbar/Navbar.vue';
import { Background } from '../components/stylizedComponents.js';


import { useCentralStore } from '../stores';
import { themeSettings } from '../theme.js';
import { ThemeProvider } from 'vue3-styled-components'
import { useMediaQuery } from '@vueuse/core'
import { ref } from 'vue';



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
    
    <Navbar />
    <ThemeProvider :theme="{
        neutralLight: neutralLight,
        dark: dark,
        primaryLight: primaryLight,
        primary: primary,
        primaryDark: primaryDark,
        background: background,
        alt: alt
    }">
        <Background>
            This is the theme changer page
        </Background>
    </ThemeProvider>

    
</template>



<style scoped>

</style>