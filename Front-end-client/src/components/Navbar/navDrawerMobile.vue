
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

let fontColor = themeProperties.value.pallete.fontColor;

let drawerVisible = ref(false);


const handleLogOut = () => {
  store.setLogout();
  router.push('/');
}

</script>


<template>
    <div>
        <div>
            <v-btn icon="menu" variant="plain" :color="fontColor" @click="drawerVisible = !drawerVisible" />
        </div>
        <div
            v-show="drawerVisible"
            class="right-drawer"
            
        >
            <v-list-item v-for="(item, index) in items" :key="index">
                <RouterLink style="text-decoration: none; color: inherit;" :to="{ name: item.routeName, params: item.routeParams }">
                    <v-icon :color="fontColor" style="display: inline; margin-right: 5px;">{{ item.icon }}</v-icon>
                    <v-list-item-title v-bind:style="{display: 'inline', color: fontColor}">{{ item.title }}</v-list-item-title>
                </RouterLink>
            </v-list-item>
            <v-list-item style="cursor: pointer;" @click="handleLogOut">
                <v-icon :color="fontColor" style="{display: inline, 'margin-right': 5px}">md: logout</v-icon>
                <v-list-item-title v-bind:style="{display: 'inline', color: fontColor}">Log out</v-list-item-title>
            </v-list-item>
        </div>
        
    </div>
</template>

<script>
export default {
    data: () => ({
    items: [
        { title: 'View Profile', routeName: 'profileView', routeParams: {}, icon: 'md: person'},
        { title: 'Change Theme', routeName: 'themeChanger', routeParams: {}, icon: 'md: display_settings' },
        { title: 'Account Settings', routeName: 'home', routeParams: {}, icon: 'md: settings' },
    ],
    }),
}
</script>

<style scoped>
.right-drawer{
    margin-right: 40%;
    padding: 30% 0% 2% 1%;
    width: max-content;
}

</style>