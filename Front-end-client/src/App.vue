<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HomeView from './views/HomeView.vue';
import Navbar from './views/Navbar.vue';
import { useCentralStore } from './stores';
import { themeSettings } from './theme.js';

// Store settings
const store = useCentralStore();
const mode = store.mode;


// Theme settings
const themeProperties = themeSettings(mode);
const neutralLight = themeProperties.pallete.neutral.light;
const dark = themeProperties.pallete.neutral.dark;
const primaryLight = themeProperties.pallete.primary.light;
const background = themeProperties.pallete.background.default;
const alt = themeProperties.pallete.background.alt;

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
  background-color: v-bind('background')
}


nav .logo h2 {
  gap: 1.75rem;
  font-weight: bold;
  font-size: clamp(1rem, 2rem, 2.25rem);
  color: #00A0BC;
}

nav .logo h2:hover {
  filter: brightness(105%)
}


</style>
