<script setup>
import { useCentralStore } from '../../stores';
import { useToast } from 'vue-toast-notification';
import { themeSettings } from '../../theme.js';
import { ThemeProvider } from 'vue3-styled-components'
import NavDrawerMobile from './navDrawerMobile.vue'
import ProfileMenu from './profileMenu.vue';
import { useMediaQuery } from '@vueuse/core'
import { ref } from 'vue';


// For toast Notifications and messages
const toast = useToast();

import { 
  StyledNav,
  StyledLogoDiv,
  StyledLogoText,
  SearchBarDiv,
  SearchBar,
  RightPanel,
} from './stylizedNavComponents.js';

// Media query to check screen size
const isLargeScreen = useMediaQuery('(min-width: 1400px)')
const isSmallScreen = useMediaQuery('(min-width: 1010px)')

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


// User Info
let fullName = '';
if(isSignedIn){
  const user = store.user;
  if(user)
    fullName = `${user.firstName} ${user.lastName}`;
}


function isSignedIn(){
  return (store.user != null && store.token != null);
}

// const props = defineProps({
//   isLoginPage: {
//     type: Boolean,
//     default: false
//   }
// })

</script>

<template>
  <header>
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
        <StyledNav>
            <StyledLogoDiv>
              <RouterLink style="text-decoration: none; color: inherit;" :to="{ name: 'home' }">
                <StyledLogoText>
                  Sociopedia
                </StyledLogoText>
              </RouterLink>
            </StyledLogoDiv>

            <SearchBarDiv v-if="isSignedIn()" v-show="isSmallScreen" >
              <SearchBar class="searchBarInput" placeholder="Search..." />
              <v-btn icon="md:search" variant="plain"/>
            </SearchBarDiv>

            
        
            <RightPanel v-if="isSignedIn()" v-show="isLargeScreen">
              <!-- <v-btn icon="md: dark_mode" :color="fontColor" variant="plain" @click="changeTheme" font-size="25px">  </v-btn> -->
              <v-btn icon="md: chat" :color="fontColor" variant="plain" @click="toast.error('Not Implemented yet')"/>
              <v-btn icon="md: notifications" :color="fontColor" variant="plain" @click="toast.error('Not Implemented yet')"/>
              <RouterLink :to="{ name: 'about' }">
                <v-btn icon="md: info" :color="fontColor" variant="plain" />
              </RouterLink>
              <ProfileMenu>{{ fullName }}</ProfileMenu>
            </RightPanel>

            <RightPanel v-if="!isSignedIn()" class="themeChangerButton">
              <RouterLink style="text-decoration: none; color: inherit;" to="/themechanger">
                <v-btn variant="plain" icon="md: display_settings" :color="fontColor"></v-btn>
              </RouterLink>
              <RouterLink :to="{ name: 'about' }">
                <v-btn icon="md: info" :color="fontColor" variant="plain" />
              </RouterLink>
              <br/>
            </RightPanel>

            <NavDrawerMobile v-if="isSignedIn()" v-show="!isLargeScreen" />

        </StyledNav>
      </ThemeProvider>
      
  </header>
</template>

<style scoped>
.themeChangerButton{
  margin-right: 5%;
}

.searchBarInput{
  color: v-bind(fontColor);
}

</style>
