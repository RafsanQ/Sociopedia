<script setup>
import { ref } from "vue";
import { useMediaQuery } from "@vueuse/core";

import { ThemeProvider } from 'vue3-styled-components'
import { themeSettings } from '../theme.js';
import { useCentralStore } from '../stores';


import RegisterForm from "../components/Forms/RegisterForm.vue";
import LoginForm from "../components/Forms/LoginForm.vue";

import {
  Background
} from '../components/stylizedComponents.js';

// For Routing stuff and refresh
import { useRouter } from 'vue-router';
const router = useRouter()


// Store
const store = useCentralStore();

const user = store.user;
const token = store.token;


if(!user && !token){
  router.push('/')
}

</script>

<template>
  <div>
    <h1>This is the home page</h1>
  </div>
</template>

<style>

</style>
