<script setup>
import { RouterLink } from 'vue-router';
import { useCentralStore } from '../stores';
import { ref } from 'vue';
import { themeSettings } from '../theme.js';



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

</script>


<template>
    <div class="text-center">
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-icon
            icon="md: account_circle"
            :color="fontColor" 
            variant="tonal"
            v-bind="props"
          >
            
          </v-icon>
        </template>
  
        <v-list v-bind:style="{ 'background-color': neutralLight }">
          <v-list-item v-for="(item, index) in items" :key="index">
            <RouterLink style="text-decoration: none; color: inherit;" :to="{ name: item.routeName, params: item.routeParams }">
              <v-icon :color="fontColor" style="display: inline; margin-right: 5px;">{{ item.icon }}</v-icon>
              <v-list-item-title v-bind:style="{display: 'inline', color: fontColor}">{{ item.title }}</v-list-item-title>
            </RouterLink>
            
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
</template>
  
<script>
export default {
    data: () => ({
    items: [
        { title: 'View Profile', routeName: 'profileView', routeParams: {userId: '12345'}, icon: 'md: person'},
        { title: 'Change Theme', routeName: 'home', routeParams: {}, icon: 'md: display_settings' },
        { title: 'Account Settings', routeName: 'home', routeParams: {}, icon: 'md: settings' },
        { title: 'Log out', routeName: 'home', routeParams: {}, icon: 'md: logout' },
    ],
    }),
}
</script>

<style scoped>
.text-center{
    display: inline;
    padding-right: 20px;
}

</style>

