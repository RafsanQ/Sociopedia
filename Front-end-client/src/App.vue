<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HomeView from './views/HomeView.vue';
import profileView from './views/profileView.vue';
import Navbar from './views/Navbar.vue';
import { useCentralStore } from './stores';
import { themeSettings } from './theme.js';

const store = useCentralStore();
const mode = store.mode;

console.log(mode)

</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped>

</style>
