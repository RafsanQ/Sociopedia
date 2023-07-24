<script setup>
import { useCentralStore } from '../stores';
import { themeSettings } from '../theme.js';
import { ThemeProvider } from 'vue3-styled-components'
import NavDrawerMobile from '../components/navDrawerMobile.vue'
import ProfileMenu from '../components/profileMenu.vue';
import { useMediaQuery } from '@vueuse/core'
import { ref } from 'vue';

import { 
  StyledNav,
  StyledLogoDiv,
  StyledLogoText,
  SearchBarDiv,
  RightPanel,
} from '../components/stylizedNav.js';

// Media query to check screen size
const isLargeScreen = useMediaQuery('(min-width: 1024px)')

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


const getThemeChangeIcon = () => {
  if(store.mode === 'light') {
    return 'md: dark_mode';
  }
  else{
    return 'md: light_mode';
  }
}

const changeTheme = () =>{
  console.log(store.mode);
  store.setMode();
  console.log(store.mode);
}


const props = defineProps({
  renderSearchbar: {
    type: Boolean,
    default: true
  }
})

</script>

<template>
  <header>
      <ThemeProvider :theme="{
        neutralLight: neutralLight,
        dark: dark,
        primaryLight: primaryLight,
        primary: primary,
        primaryDark: primaryDark,
        background: background,
        alt: alt
      }">
        <StyledNav>
          <!-- <RouterLink :to="{ name: 'home' }">Home</RouterLink>
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
          <RouterLink :to="{ name: 'login' }">Login</RouterLink>
          <RouterLink :to="{ name: 'profileView', params: { userId: '12345' } }">Profile View</RouterLink> -->
        
            <StyledLogoDiv>
              <RouterLink style="text-decoration: none; color: inherit;" :to="{ name: 'home' }">
                <StyledLogoText>
                  Sociopedia
                </StyledLogoText>
              </RouterLink>
            </StyledLogoDiv>
            <SearchBarDiv v-if="renderSearchbar" v-show="isLargeScreen" >
              <input placeholder="Search..."/>
              <v-btn icon="md:search" variant="plain" color="" />
            </SearchBarDiv>

            
        
            <RightPanel v-show="isLargeScreen">
              <v-btn icon="md: dark_mode" :color="fontColor" variant="plain" @click="changeTheme" font-size="25px">  </v-btn>
              <v-btn icon="md: chat" :color="fontColor" variant="plain"></v-btn>
              <v-btn icon="md: notifications" :color="fontColor" variant="plain"></v-btn>
              <ProfileMenu></ProfileMenu>
            </RightPanel>

            <NavDrawerMobile v-show="!isLargeScreen" />

        </StyledNav>
      </ThemeProvider>
      
  </header>
</template>

<style scoped>

</style>
