<script setup>
import { useRoute } from 'vue-router';
const route = useRoute(); 
const userId = route.params.userId; // read parameter id (it is reactive) 
</script>

<template>
  <div>
    <h1>This is the profile page</h1>
    <H2>The user is {{ userId }}</H2>
  </div>
</template>

<style>

</style>
