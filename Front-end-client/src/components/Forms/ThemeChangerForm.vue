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


// For Routing stuff and refresh
import { useRouter } from 'vue-router';
const router = useRouter()


const props = defineProps(['changeForm'])

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

let mode = ref(store.mode);

async function handleThemeChange(){
  const delay = ms => new Promise(res => setTimeout(res, ms));

  await delay(100);

  isLoading.value = true;

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
    <CenteredForm>
        <StyledText> We have two defined themes for this website. </StyledText>
        <br>
        <!-- Regular Switch -->
        <v-switch class="switch-center"  v-show="!isLoading"
            v-model="mode"
            hide-details
            inset
            :label="mode.charAt(0).toUpperCase() + mode.slice(1)"
            false-value="light"
            true-value="dark"
            @change="handleThemeChange"
        />

        <!-- Switch to show that it is loading -->
        <v-switch class="switch-center" v-show="isLoading"
            v-model="mode"
            hide-details
            inset
            :label="mode.charAt(0).toUpperCase() + mode.slice(1)"
            false-value="light"
            true-value="dark"
            :loading="primary"
            @change="handleThemeChange"
        />
      
    </CenteredForm>
  </ThemeProvider>
</template>



<style scoped>
.switch-center {
  display: flex;
  justify-content: center;
}
</style>