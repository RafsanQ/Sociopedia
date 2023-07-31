<script setup>
import { ref } from "vue";
import { useMediaQuery } from "@vueuse/core";

import { ThemeProvider } from 'vue3-styled-components'
import { themeSettings } from '../theme.js';
import { useCentralStore } from '../stores';


import RegisterForm from "../components/Forms/RegisterForm.vue";
import LoginForm from "../components/Forms/LoginForm.vue";

import {
  Background,
  ColumnDiv
} from '../components/stylizedComponents.js';

import {
  WidgetWrapper
} from '../components/Widgets/stylizedComponents';

import UserImageWidget from '../components/Widgets/UserImageWidget.vue'

// For Routing stuff and refresh
import { useRouter } from 'vue-router';
const router = useRouter()


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



// Check if Signed in
const user = store.user;
const token = store.token;

if(!user && !token){
  router.push('/')    // If not redirect to login page
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
      <div class="container">


        <ColumnDiv class="leftColumn">
          <WidgetWrapper>
            <div>
              <UserImageWidget :email="user.email" size="50px"/>
              <h3>{{ user.firstName }} {{ user.lastName }}</h3>
              <p>{{ user.friends.length }} Friends</p>
            </div>
            <br>
            <v-divider/>
            <br>
            <div>
              <v-icon class="inline">location_on</v-icon>
              <p class="normalText inline">{{ user.location }}</p>
            </div>
            <br>
            <div>
              <v-icon class="inline">work</v-icon>
              <p class="normalText inline">{{ user.occupation }}</p>
            </div>
            <br>
            <v-divider/>
            <br>
            <div>
              <p class="normalText inline">Who has viewed your profile</p>
              <h5 class="figureInline">{{ user.viewedProfile }}</h5>
            </div>
            <br>
            <div style="{width: 100%;}">
              <p class="normalText inline">Impressions on your post</p>
              <h5 class="figureInline">{{ user.impressions }}</h5>
            </div>

          </WidgetWrapper>
        </ColumnDiv>
        
        
        <ColumnDiv class="centreColumn">
          <WidgetWrapper>
            centre
          </WidgetWrapper>
            
          <WidgetWrapper>
            centre
          </WidgetWrapper>
        </ColumnDiv>

        <ColumnDiv class="rightColumn">
          <WidgetWrapper>
            right
          </WidgetWrapper>

          <WidgetWrapper>
            right
          </WidgetWrapper>
        </ColumnDiv>

      </div>
      
    </Background>
  </ThemeProvider>
</template>

<style>
.container {
  display: flex;
  align-items: flex-start;
  text-align: center;
  justify-content: center;
}

.inline{
  display: inline;
  margin: 1%;
}


.normalText{
  padding: 0.25rem;
  padding-top: 0.5rem;
}

.figureInline{
  display: inline;
  text-align: justify;
  margin: 8%;
}

</style>
