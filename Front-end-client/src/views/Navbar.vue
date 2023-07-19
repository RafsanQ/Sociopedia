<script setup>
import { useMediaQuery } from '@vueuse/core'
import { useCentralStore } from '../stores';
import { themeSettings } from '../theme.js';
import { ref } from 'vue'


// Media query to check screen size
const isLargeScreen = useMediaQuery('(min-width: 1024px)')

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

</script>

<template>
  <header>
      <nav>
        <!-- <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
        <RouterLink :to="{ name: 'login' }">Login</RouterLink>
        <RouterLink :to="{ name: 'profileView', params: { userId: '12345' } }">Profile View</RouterLink> -->
        
        <div class="logo">
          <RouterLink style="text-decoration: none; color: inherit;" :to="{ name: 'home' }">
            <h2>
              Sociopedia
            </h2>
          </RouterLink>
        </div>

        <div v-show="isLargeScreen" class="searchbar">
          <input placeholder="Search..."/>
        </div>

        <div v-show="isLargeScreen" class="navigation">
          
        </div>
      </nav>

  </header>
</template>

<style scoped>
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

nav .searchbar {
  background: v-bind(neutralLight);
  border-radius: 9px;
  gap: 3rem;
  padding: 0.1rem 1.5rem;
}

nav .searchbar{

}


</style>
