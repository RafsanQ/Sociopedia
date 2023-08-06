<script setup>

import { ref } from "vue";
import { useCentralStore } from '../stores';

import ProfileImageWidget from "./Widgets/ProfileImageWidget.vue";

import {
    CentralCard
} from './stylizedComponents.js';


// For Routing stuff and refresh
import { useRouter } from 'vue-router';
const router = useRouter()


const props = defineProps({
    postProperties: {
        Type: Object
    }
})


// Store
const store = useCentralStore();
const user = store.user;

let isLiked = ref(false);
if(props.postProperties.likes[user._id]){
    isLiked.value = true;
}
else{
    isLiked.value = false;
}

async function handleLike(){
    
    try{
    const response = await fetch("http://localhost:3001/posts/" + props.postProperties._id + '/like', {
        method: 'PATCH',
        headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${store.token}`
            },
        body: JSON.stringify({
            userId: user._id
        })
    })
    console.log(await response.json());
    isLiked.value = !isLiked.value;
  }catch(error){
    console.log(error);
  }
}


let mediaLocation = props.postProperties.mediaPath;

if (mediaLocation.startsWith("public/")) {
    mediaLocation = mediaLocation.slice(7, mediaLocation.length).trimLeft();
}

mediaLocation = 'http://localhost:3001/' + mediaLocation;



</script>


<template>
    <CentralCard class="card">
        <div class="userInfo">
            <ProfileImageWidget class="profilePicture" :email="postProperties.userEmail" size="45px"/>
            <h3 class="username"> {{ postProperties.userFirstName + ' ' + postProperties.userLastName }}</h3>
        </div>
        <br>
        <div class="postText">
            <p>{{ postProperties.text }}</p>
        </div>
        <div class="media">
            <img v-if="postProperties.mediaType == 'image'" :src="mediaLocation" />
            <video v-if="postProperties.mediaType == 'video'" :src="mediaLocation" controls />
            <video v-if="postProperties.mediaType == 'audio'" :src="mediaLocation" controls class="audio" />
        </div>
        <br>
        <div>
            <v-btn icon="md:thumb_up" :color="isLiked ? 'light-blue-accent-4' : ''" variant="plain" @click="handleLike"/>
        </div>
        
        
    </CentralCard>
</template>



<style scoped>
.card{
    margin: 2% 1%;
}

.media {
    text-align: center;
}

.media img, video {
    width: 100%;
    
}

.media .audio{
    width: 90%;
    height: 2rem;
}

.userInfo {
    display: block;
    text-align: right;
    align-items: left;
}

.profilePicture{
    margin-right: 2%;
    float: left;
}

.username{
    float: left;
}

.postText{
    display: block;
    padding: 5% 1%;
}

</style>
