<script setup>
import { Background } from '../components/stylizedComponents.js';


import { useCentralStore } from '../stores';
import { themeSettings } from '../theme.js';
import { ThemeProvider } from 'vue3-styled-components'
import { useMediaQuery } from '@vueuse/core'
import { ref } from 'vue';

import ThemeChangerForm from '../components/Forms/ThemeChangerForm.vue';

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
            <ThemeChangerForm></ThemeChangerForm>
        </Background>
    </ThemeProvider>

    
</template>



<style scoped>

</style>