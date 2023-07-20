<script setup>
import { useMediaQuery } from '@vueuse/core'
import { useCentralStore } from '../stores';
import { themeSettings } from '../theme.js';
import { ref } from 'vue'
import { storeToRefs } from 'pinia'




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

console.log(background);
console.log(alt);


const getThemeChangeIcon = () => {
  if(mode === 'light') {
    return 'fa:fas fa-moon'
  }
  else{
    return 'fa:fas fa-sun'
  }
}

const changeTheme = () =>{
  store.setMode();
  
}

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
            <v-btn icon="fa:fas fa-search" variant="plain" />
          </div>
          
          <div v-show="isLargeScreen" class="navigation">
            <v-btn  :icon="getThemeChangeIcon()" variant="plain" @click="changeTheme()" font-size="25px"/>
          
          </div>
      </nav>
      
  </header>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: -v-bind(alt);
}

nav .logo {
  padding: 1rem 6%;
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

nav .searchbar input{
  outline: none;
}

nav .navigation {
  gap: 2rem;
}

nav .navigation button{
  font-size: 25px;
}

</style>
