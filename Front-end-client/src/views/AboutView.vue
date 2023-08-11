<script setup>
import { ref } from "vue";
import { ThemeProvider } from 'vue3-styled-components'
import { themeSettings } from '../theme.js';
import { useCentralStore } from '../stores';


import {
  Background,
} from '../components/stylizedComponents.js';

 
// Store
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


</script>

<template>
  <ThemeProvider :theme="{
        neutralLight,
        dark,
        primaryLight,
        primary,
        primaryDark,
        background,
        alt,
        fontColor
  }">
    <Background class="background">
      <div class="card">
        <h2>About Sociopedia</h2>
        <p>Welcome to our vibrant online community where connections come to life! Our Social Media Clone brings together the best aspects of social networking, allowing you to express yourself through a variety of media while fostering meaningful interactions with others.</p>

        <h4>Unleash Your Creativity</h4>
        <p>Step into a world of endless possibilities as you embark on a journey of creative expression. Our platform empowers you to share your visual and auditory masterpieces effortlessly. Whether it's a stunning photograph, a captivating video, or an inspiring audio clip, you have the tools to turn your ideas into captivating posts that resonate with your audience.</p>

        <h4>Seamless User Experience</h4>
        <p>We believe in making social networking a seamless and enjoyable experience. Our user-friendly interface ensures that you can navigate the platform effortlessly, focusing on what truly matters – connecting with others. Once you've created your account and logged in, you'll be greeted by a dynamic feed filled with a diverse array of content from other users.</p>

        <h4>Engage and Connect</h4>
        <p>Interactivity lies at the heart of our Social Media Clone. Engage in lively discussions by liking and commenting on posts that resonate with you. Forge connections with like-minded individuals, discover new perspectives, and build a network that extends beyond geographical boundaries. Your engagement contributes to a lively and thriving community where every voice is valued.</p>

        <h4>Join Us Today</h4>
        <p>Embark on a journey of connection, creativity, and camaraderie. Join our growing community and be a part of the next generation of social networking. Sign up now to begin your exploration of our Social Media Clone, where every post is a story, and every interaction is a chance to make a lasting connection.</p>
      </div>
    </Background>
  </ThemeProvider>
</template>

<style scoped>

.card{
  max-width: 60%;
  margin: 2% auto;
  padding: 3%;
  color: v-bind(fontColor);
  background-color: v-bind(alt);
  border-radius: 1rem;
}

h2 {
  text-align: center;
  margin: 1rem 0 2rem 0;
}
h4{
  text-align: center;
  margin: 1rem 0 1rem 0;
}
p{
  margin: 1rem 1rem 2rem 1rem;
}

</style>
