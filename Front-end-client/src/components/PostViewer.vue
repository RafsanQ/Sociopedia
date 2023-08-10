<script setup>

import { ref } from "vue";
import { useCentralStore } from '../stores';
import { useToast } from 'vue-toast-notification';
import ProfileImageWidget from "./Widgets/ProfileImageWidget.vue";
import CommentSection from './CommentSection.vue'

import {
    CentralCard
} from './stylizedComponents.js';

// For toast Notifications and messages
const toast = useToast();


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
    isLiked.value = !isLiked.value;
    
  }catch(error){
    toast.error(error);
  }
}


let mediaLocation = props.postProperties.mediaPath;

if (mediaLocation.startsWith("public/")) {
    mediaLocation = mediaLocation.slice(7, mediaLocation.length).trimLeft();
}

mediaLocation = 'http://localhost:3001/' + mediaLocation;


async function handleAddFriend(){
    try{
        const response = await fetch('http://localhost:3001/users/' + user._id + '/' + props.postProperties.userId, {
            method: 'PATCH',
            headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${store.token}`
                },
        })
        const newFriend = await response.json();
        if(newFriend[0]){
            store.addFriend(newFriend[0]._id);
            toast.success("Friend Added successfully");
            location.reload();
        }      
        
    }catch(error){
        console.log(error);
        toast.error("Failed to add friend");
    }
}


let showCommentBox = ref(false);

function getTimeDifference(updatedTime){
    var date1 = new Date();
    var date2 = new Date(updatedTime);

    var Difference_In_Time = Math.abs(date1.getTime() - date2.getTime());

    const differenceInSeconds = Math.ceil(Difference_In_Time / (1000));
    
    const differenceInMinutes = Math.ceil(differenceInSeconds / (60))
    
    const differenceInHours = Math.ceil(differenceInMinutes / (60))

    const differenceInDays = Math.ceil(differenceInHours / (24))

    if(differenceInDays > 1) return differenceInDays.toString() + " days ago";
    if(differenceInHours > 1) return differenceInHours.toString() + " hours ago";
    if(differenceInMinutes > 1) return differenceInMinutes.toString() + " minutes ago";
    return differenceInSeconds.toString() + " seconds ago";
}

</script>


<template>
    <CentralCard class="card">
        <div class="userInfo">
            <ProfileImageWidget class="profilePicture" :email="postProperties.userEmail" size="50px"/>
            <h3 class="username"> {{ postProperties.userFirstName + ' ' + postProperties.userLastName }}</h3>
            <br>
            
            <v-btn icon="md:add" class="addFriendButton" v-show="user._id != postProperties.userId && !user.friends.includes(postProperties.userId)" @click="handleAddFriend"/>
        </div>
        <p class="time">{{ getTimeDifference(postProperties.createdAt) }}</p>
        <div class="postText">
            <p>{{ postProperties.text }}</p>
        </div>
        <div class="media">
            <img v-if="postProperties.mediaType == 'image'" :src="mediaLocation" />
            <video v-if="postProperties.mediaType == 'video'" :src="mediaLocation" controls />
            <video v-if="postProperties.mediaType == 'audio'" :src="mediaLocation" controls class="audio" />
        </div>
        <div>
            <v-btn class="actions" icon="md:thumb_up" :color="isLiked ? 'light-blue-accent-4' : ''" variant="plain" @click="handleLike"/>
            <v-btn class="actions" icon="md:chat_bubble" :color="showCommentBox ? 'light-blue-accent-4' : ''" variant="plain" @click="showCommentBox = !showCommentBox"/>
        </div>
        <br>
        <CommentSection v-if="showCommentBox" :postId="postProperties._id" :comments="postProperties.comments" />
        
        
    </CentralCard>
</template>



<style scoped>
.card{
    margin: 2% 0% 0% 0%;
    overflow: auto;
}

.media {
    text-align: center;
}

.media img, video {
    width: 90%;
}

.media .audio{
    width: 90%;
    height: 2rem;
}

.userInfo {
    display: block;
    text-align: right;
    align-items: left;
    margin-bottom: 1%;
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
    padding: 6% 1% 3% 3%;
}

.addFriendButton{
    display: inline;
    float: right;
}

.time{
    margin: 0% 1% 0% 5%;
}

</style>
