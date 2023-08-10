<script setup>
import { ref, onBeforeMount } from "vue";
import { useMediaQuery } from "@vueuse/core";

import { ThemeProvider } from 'vue3-styled-components'
import { themeSettings } from '../theme.js';
import { useCentralStore } from '../stores';



import CreatePostWidget from "../components/Widgets/CreatePostWidget.vue";

import {
  Background,
  ColumnDiv,
} from '../components/stylizedComponents.js';

import {
  WidgetWrapper
} from '../components/Widgets/stylizedComponents';

import ProfileImageWidget from '../components/Widgets/ProfileImageWidget.vue'
import PostViewer from '../components/PostViewer.vue';

// For Routing stuff and refresh
import { useRouter } from 'vue-router';
import FriendsListWidget from "../components/Widgets/FriendsListWidget.vue";
const router = useRouter()

// Store
const store = useCentralStore();


// Media query to check screen size
const isLargeScreen = useMediaQuery('(min-width: 1577px)')



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



// Check if Signed in
const user = store.user;
const token = store.token;

if(!user || !token){
  router.push('/')    // If not redirect to login page
}

// Get posts for feed
let posts = ref(store.posts);
const getPosts = async () => {
  try{
    const response = await fetch("http://localhost:3001/posts/",{
            method: 'GET',
            headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${store.token}`
                }
    })
    posts.value = await response.json();
    store.setPosts(posts.value);
  }catch(error){
    console.log(error);
  }
}

onBeforeMount(getPosts);



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
    <Background>
      <div class="container">

        <!-- left column - Profile Section -->
        <ColumnDiv v-show="isLargeScreen" class="leftColumn" >
          <WidgetWrapper>
            <div>
              <ProfileImageWidget :email="user.email" size="50px"/>
              <h3>{{ user.firstName }} {{ user.lastName }}</h3>
              <p>{{ user.friends.length }} Friends</p>
            </div>
            <br>
            <v-divider/>
            <br>
            <div>
              <v-icon class="inline">location_on</v-icon>
              <p class="normalText inline">{{ user.location }}</p>
            </div>
            <br>
            <div>
              <v-icon class="inline">work</v-icon>
              <p class="normalText inline">{{ user.occupation }}</p>
            </div>
            <br>
            <v-divider/>
            <br>
            <div>
              <p class="normalText inline">Who has viewed your profile</p>
              <h5 class="figureInline">{{ user.viewedProfile }}</h5>
            </div>
            <br>
            <div style="{width: 100%;}">
              <p class="normalText inline">Impressions on your post</p>
              <h5 class="figureInline">{{ user.impressions }}</h5>
            </div>

          </WidgetWrapper>
        </ColumnDiv>
        
        <!-- Center column - feed and post section -->
        <ColumnDiv class="centreColumn" v-bind:class="{
          'largeWidth': !isLargeScreen
        }">
          <CreatePostWidget />
          <br>
          <Suspense>
            
            <PostViewer v-for="post in posts" :postProperties="post" />
          
          </Suspense>
           
           
          
          
        </ColumnDiv>

        <!-- Right column - friend List section  -->
        <ColumnDiv v-show="isLargeScreen" class="rightColumn">
            <WidgetWrapper>

              <a  target="_blank" href="https://stock.adobe.com/images/red-sale-banner-50-percent-off-discount-offer-promotion-weekend-or-season-special-offer-poster-with-price-tag-design-for-marketing-vector-illustration-christmas-stock-blowout-advertisement/525289733?as_campaign=ftmigration2&as_channel=dpcft&as_campclass=brand&as_source=ft_web&as_camptype=acquisition&as_audience=users&as_content=closure_asset-detail-page">
                <img class="ad" src="/generic add.jpg">
              </a>
              
            </WidgetWrapper>

          <br>

          <WidgetWrapper>
            <FriendsListWidget />
          </WidgetWrapper>
        </ColumnDiv>

      </div>
      
    </Background>
  </ThemeProvider>
</template>

<style>
.container {
  display: flex;
  align-items: flex-start;
  text-align: center;
  justify-content: center;
}


.leftColumn, .rightColumn{
  max-width: 25%;
}


.centreColumn{
  min-width: 50%;
}

.largeWidth{
  min-width: 90%;
}

.inline{
  display: inline;
  margin: 1%;
}


.normalText{
  padding: 0.25rem;
  padding-top: 0.5rem;
}

.figureInline{
  display: inline;
  text-align: justify;
  margin: 8%;
}

.ad{
  width: 100%;
}
</style>
