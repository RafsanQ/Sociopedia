<script setup>
import { useRoute } from 'vue-router';
import Navbar from '../components/Navbar/Navbar.vue';

const route = useRoute(); 
const userId = route.params.userId; // read parameter id (it is reactive) 
</script>

<template>
  <div>
    <Navbar />
    <h1>This is the profile page</h1>
    <H2>The user id is {{ userId }}</H2>
  </div>
</template>

<style>

</style>
