<script setup>
import { ref } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { ThemeProvider } from 'vue3-styled-components'
import { themeSettings } from '../../theme.js';
import { useCentralStore } from '../../stores';



import {
  CenteredForm,
  StyledInput,
  StyledSubmitButton,
  StyledText,
  StyledTextButton
} from './stylizedFormComponents.js';

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


// The user object that will be sent on login
const userForm = {email: "", password: ""};

async function handleLogin(){
  // console.log('handling login', userForm);
  await store.setLogin(userForm);
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
    <CenteredForm @submit.prevent="handleLogin">
      <StyledText>Welcome to Sociopedio. The best social media platform.</StyledText>
      <StyledInput type="email" placeholder="Email" v-model="userForm.email" required />
      <StyledInput type="password" placeholder="Password" v-model="userForm.password" required />

      <StyledSubmitButton variant="tonal">
        Sign in
      </StyledSubmitButton>

      <StyledText>New here?</StyledText> <br>
      <StyledTextButton @click="props.changeForm">Create an account</StyledTextButton>
    </CenteredForm>
  </ThemeProvider>
</template>



<style scoped>

</style>