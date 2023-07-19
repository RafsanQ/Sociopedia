<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue'
import HomeView from './views/HomeView.vue';
import Navbar from './views/Navbar.vue';
import { useCentralStore } from './stores';
import { themeSettings } from './theme.js';
import { useMediaQuery } from '@vueuse/core'

// Store settings
const store = useCentralStore();
const mode = store.mode;


// Theme settings
const themeProperties = themeSettings(mode);
const neutralLight = ref(themeProperties.pallete.neutral.light);
const dark = ref(themeProperties.pallete.neutral.dark);
const primaryLight = ref(themeProperties.pallete.primary.light);
const primary = ref(themeProperties.pallete.primary.main);
const primaryDark = ref(themeProperties.pallete.primary.dark);
const background = ref(themeProperties.pallete.background.default);
const alt = ref(themeProperties.pallete.background.alt);

// Media query to check screen size
const isLargeScreen = useMediaQuery('(min-width: 1024px)')



// // User Info
// const user = store.user;
// const fullName = `${user.firstName} ${user.lastName}`;



</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style>

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav .logo {
  padding: 1rem 6%;
  background: -v-bind(alt);
}


nav .logo h2 {
  gap: 1.75rem;
  font-weight: bold;
  font-size: clamp(1rem, 2rem, 2.25rem);
  color: v-bind(primary);
}

nav .logo h2:hover {
  filter: brightness(90%)
}


</style>
