<script setup>
import { ref } from "vue";
import { useMediaQuery } from "@vueuse/core";

import { ThemeProvider } from 'vue3-styled-components'
import { themeSettings } from '../../theme.js';
import { useCentralStore } from '../../stores';

import {
  CenteredForm,
  StyledInput,
  StyledSmallInput,
  StyledSubmitButton,
  StyledText,
  StyledTextButton
} from './stylizedFormComponents.js';
import ImageUploadFielInput from './ImageUploadFieldInput.vue'

const props = defineProps(['changeForm'])


// For Routing stuff and refresh
import { useRouter } from 'vue-router';
const router = useRouter()

// Store
const store = useCentralStore();

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

// Theme Loading Stuff
let isLoading = ref(false);



let isOnRight = ref(store.mode);

async function handleThemeChange(){
    isLoading.value = true;

    const delay = ms => new Promise(res => setTimeout(res, ms));

    await delay(1000);

    store.setMode();

    await delay(1000);

    router.go();
} 


</script>

<template>
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
    <CenteredForm class="body">
        <StyledText> We have two defined themes for this website. </StyledText>

        <!-- Regular Switch -->
        <v-switch v-show="!isLoading"
            v-model="isOnRight"
            hide-details
            inset
            :label="`Current Theme: ${isOnRight.toString().toUpperCase()}`"
            false-value="light"
            true-value="dark"
            @change="handleThemeChange"
        />

        <!-- Switch to show that it is loading -->
        <v-switch v-show="isLoading"
            v-model="isOnRight"
            hide-details
            inset
            :label="`Current Theme: ${isOnRight.toString().toUpperCase()}`"
            false-value="light"
            true-value="dark"
            :loading="primary"
            @change="handleThemeChange"
        />
      
    </CenteredForm>
  </ThemeProvider>
</template>



<style scoped>
.body{
    max-width: 20%;
    align-items: center;
    text-align: center;
}
</style>