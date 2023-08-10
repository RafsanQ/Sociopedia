
<script setup>
import { ref } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { useToast } from 'vue-toast-notification';



import { ThemeProvider } from 'vue3-styled-components'
import { themeSettings } from '../theme.js';
import { useCentralStore } from '../stores';


import RegisterForm from "../components/Forms/RegisterForm.vue";
import LoginForm from "../components/Forms/LoginForm.vue";

import {
  Background
} from '../components/stylizedComponents.js';

import {
  CenteredForm,
  StyledInput,
  StyledSmallInput,
  StyledSubmitButton,
  StyledText,
} from '../components/Forms/stylizedFormComponents.js';
import MediaUploadFieldInput from '../components/Forms/MediaUploadFieldInput.vue'



// For Routing stuff and refresh
import { useRouter } from 'vue-router';
const router = useRouter()


// For toast Notifications and messages
const toast = useToast();

// Media query to check screen size
const isLargeScreen = useMediaQuery('(min-width: 800px)')

// Store
const store = useCentralStore();

const user = store.user;
const token = store.token;

if(!user && !token){
  router.push('/')    // If not redirect to login page
}

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

// The user object that will be sent on login
const userForm = {
  userId: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  location: user.location,
  occupation: user.occupation,
  email: user.email,
  password: "",
  picture: null
};


function getPicture(value){
  userForm.picture = value;
}

async function handleSubmit(){
  
  try{
      const response = await fetch("http://localhost:3001/users/accountsettings", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${store.token}`
          },
          body: JSON.stringify(userForm)
      });
      
      if(response.status == 200 || response.status == 201){
          toast.success('Update Successful');
          store.setUser(await response.json());
          // Wait 0.1s
          const delay = ms => new Promise(res => setTimeout(res, ms));
          await delay(1000);

          location.assign('/')
      }

      else if(response.status == 400){
          console.log(response.json());
          toast.error(response.message);
      }

      else{
          toast.error('Server Error');
      }

  }catch(error){
      toast.error(error.message);
      return error;
  }
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
        <CenteredForm @submit.prevent="handleSubmit">
          <StyledSmallInput type="text" placeholder="First Name" v-model="userForm.firstName" required />
          <StyledSmallInput type="text" placeholder="Last Name" v-model="userForm.lastName" required />
          <StyledInput type="text" placeholder="Location" v-model="userForm.location" required />
          <StyledInput type="text" placeholder="Occupation" v-model="userForm.occupation" required />
          <StyledInput type="email" placeholder="Email" readonly v-model="userForm.email" required />
          <StyledInput type="password" placeholder="New Password" v-model="userForm.password" />
          <MediaUploadFieldInput type="file" placeholder="Profile Picture" showText @inputMedia="getPicture" >Profile Picture:</MediaUploadFieldInput>
          <StyledSubmitButton variant="tonal">
            Make Changes
          </StyledSubmitButton>
        </CenteredForm>
      </Background>
    </ThemeProvider>
</template>


<style  scoped>

</style>