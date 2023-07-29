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
const userForm = {
  firstName: "",
  lastName: "",
  location: "",
  occupation: "",
  email: "",
  password: "",
  picture: null
};

function getPicture(value){
  userForm.picture = value;
}

function handleRegister(){
  console.log(userForm);
  store.register(userForm);
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
    <CenteredForm @submit.prevent="handleRegister">
      <StyledText>
        Welcome to Sociopedio. The best social media platform.
      </StyledText>
      <br/>
      <br/>
      <StyledSmallInput type="text" placeholder="First Name" v-model="userForm.firstName" required />
      <StyledSmallInput type="text" placeholder="Last Name" v-model="userForm.lastName" required />
      <StyledInput type="text" placeholder="Location" v-model="userForm.location" required />
      <StyledInput type="text" placeholder="Occupation" v-model="userForm.occupation" required />
      <StyledInput type="email" placeholder="Email" v-model="userForm.email" required />
      <StyledInput type="password" placeholder="Password" v-model="userForm.password" required />
      <ImageUploadFielInput type="file" placeholder="Profile Picture" @picture="getPicture" >Profile Picture:</ImageUploadFielInput>
      <StyledSubmitButton variant="tonal">
        Register
      </StyledSubmitButton>

      <StyledText>Already have an account?</StyledText> <br>
      <StyledTextButton @click="props.changeForm">Sign in</StyledTextButton>
    </CenteredForm>
  </ThemeProvider>
</template>



<style scoped>

</style>