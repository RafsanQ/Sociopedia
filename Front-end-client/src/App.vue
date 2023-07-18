<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HomeView from './views/HomeView.vue';
import profileView from './views/profileView.vue';
import Navbar from './views/Navbar.vue';
import { useCentralStore } from './stores';


const store = useCentralStore();

</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
        <RouterLink :to="{ name: 'login' }">Login</RouterLink>
        <RouterLink :to="{ name: 'profileView', params: { userId: '12345' } }">Profile View</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
