<script setup>

import { ref } from "vue";
import { ThemeProvider } from 'vue3-styled-components'
import { themeSettings } from '../../theme.js';
import { useCentralStore } from '../../stores';

import {
    WidgetWrapper,
    StyledInput
} from './stylizedComponents.js';

// For Routing stuff and refresh
import { useRouter } from 'vue-router';
const router = useRouter()

// Store
const store = useCentralStore();

// Theme settings
const themeProperties = ref(themeSettings(store.mode));
let neutralLight = themeProperties.value.pallete.neutral.light;
let neutralDark = themeProperties.value.pallete.neutral.dark;
let primaryLight = themeProperties.value.pallete.primary.light;
let primary = themeProperties.value.pallete.primary.main;
let primaryDark = themeProperties.value.pallete.primary.dark;
let background = themeProperties.value.pallete.background.default;
let alt = themeProperties.value.pallete.background.alt;

let fontColor = themeProperties.value.pallete.fontColor;


</script>


<template>
    <div>
        <h2>Post Form</h2>
    </div>
</template>



<style scoped>

</style>
