<script setup>
import { useCentralStore } from '../stores';
import { themeSettings } from '../theme.js';
import { ThemeProvider } from 'vue3-styled-components'
import ProfileMenu from '../components/profileMenu.vue'
import { useMediaQuery } from '@vueuse/core'
import { ref } from 'vue';

import { 
  StyledNav,
  StyledLogoDiv,
  StyledLogoText,
  SearchBarDiv,
  RightPanel
} from '../components/stylizedNav.js';

// Media query to check screen size
const isLargeScreen = useMediaQuery('(min-width: 1024px)')

const store = useCentralStore();


// Theme settings
const themeProperties = ref(themeSettings(store.mode));


const neutralLight = ref(themeProperties.value.pallete.neutral.light);
const dark = ref(themeProperties.value.pallete.neutral.dark);
const primaryLight = ref(themeProperties.value.pallete.primary.light);
const primary = ref(themeProperties.value.pallete.primary.main);
const primaryDark = ref(themeProperties.value.pallete.primary.dark);
const background = ref(themeProperties.value.pallete.background.default);
const alt = ref(themeProperties.value.pallete.background.alt);



const getThemeChangeIcon = () => {
  if(mode === 'light') {
    return 'md: dark_mode'
  }
  else{
    return 'md: light_mode'
  }
}

const changeTheme = () =>{
  console.log(store.mode);
  store.setMode();
  console.log(store.mode)
}

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
            <SearchBarDiv v-show="isLargeScreen">
              <input placeholder="Search..."/>
              <v-btn icon="md:search" variant="plain" color="" />
            </SearchBarDiv>

            
        
            <RightPanel v-show="isLargeScreen">
              <v-btn  icon="md: dark_mode" variant="plain" @click="changeTheme()" font-size="25px"/>
              <v-btn icon="md: chat" variant="plain"></v-btn>
              <v-btn icon="md: notifications" variant="plain"></v-btn>
              <ProfileMenu></ProfileMenu>
            </RightPanel>
        </StyledNav>
      </ThemeProvider>
      
  </header>
</template>

<style scoped>

</style>
