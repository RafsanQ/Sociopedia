<script setup>
import { RouterLink } from 'vue-router';
import { useCentralStore } from '../../stores';
import { themeSettings } from '../../theme.js';
import { ref } from 'vue';

// For Routing stuff and refresh
import { useRouter } from 'vue-router';
const router = useRouter()



const store = useCentralStore();

const themeProperties = ref(themeSettings(store.mode));


let neutralLight = themeProperties.value.pallete.neutral.light;
let dark = themeProperties.value.pallete.neutral.dark;
let primaryLight = themeProperties.value.pallete.primary.light;
let primary = themeProperties.value.pallete.primary.main;
let primaryDark = themeProperties.value.pallete.primary.dark;
let background = themeProperties.value.pallete.background.default;
let alt = themeProperties.value.pallete.background.alt;

let fontColor = themeProperties.value.pallete.fontColor;


const handleLogOut = () => {
  store.setLogout();
  router.push('/');
}


</script>


<template>
    <div class="text-center">
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn
          prepend-icon="md: account_circle"
            :color="alt"  
            elevation="0" 
            varient="plain"
            density="compact"
            size="x-large"
            v-bind="props"
          >
            <template v-slot:prepend>
              <v-icon :color="fontColor"></v-icon>
            </template>
            <div class="userName">
              <slot></slot>
            </div>
          </v-btn>
        </template>
  
        <v-list v-bind:style="{ 'background-color': neutralLight }">
          <v-list-item v-for="(item, index) in items" :key="index">
            <RouterLink style="text-decoration: none; color: inherit;" :to="{ name: item.routeName, params: item.routeParams }">
              <v-icon :color="fontColor" style="display: inline; margin-right: 5px;">{{ item.icon }}</v-icon>
              <v-list-item-title v-bind:style="{display: 'inline', color: fontColor}">{{ item.title }}</v-list-item-title>
            </RouterLink>
            
          </v-list-item>

          <!-- Log Out option -->
          <v-list-item style="cursor: pointer;" @click="handleLogOut">
            <v-icon :color="fontColor" style="{display: inline, 'margin-right': 5px}">md: logout</v-icon>
            <v-list-item-title v-bind:style="{display: 'inline', color: fontColor}">Log out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
</template>
  
<script>
export default {
    data: () => ({
    items: [
        { title: 'View Profile', routeName: 'profileView', routeParams: {}, icon: 'md: person'},
        { title: 'Change Theme', routeName: 'themeChanger', routeParams: {}, icon: 'md: display_settings' },
        { title: 'Account Settings', routeName: 'accountSettings', routeParams: {}, icon: 'md: settings' },
        // { title: 'Log out', routeName: 'login', routeParams: {}, icon: 'md: logout' },
    ],
    }),
}
</script>

<style scoped>
.text-center{
    display: inline;
    padding-left: 5px;
    padding-right: 25px;
    cursor: pointer;

}

.userName{
  letter-spacing: normal;
  text-transform: none;
  font-stretch: condensed;
  color: v-bind(fontColor);
}

</style>

