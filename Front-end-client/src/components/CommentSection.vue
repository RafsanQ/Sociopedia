<script setup>
import { ref, getCurrentInstance  } from "vue";
import { useCentralStore } from '../stores';
import { useToast } from 'vue-toast-notification';
import { themeSettings } from '../theme.js';
import ProfileImageWidget from "./Widgets/ProfileImageWidget.vue";

// For toast Notifications and messages
const toast = useToast();

// Store
const store = useCentralStore();
const user = store.user;

// Theme Stuff
const themeProperties = ref(themeSettings(store.mode));

let neutralLight = themeProperties.value.pallete.neutral.light;
let dark = themeProperties.value.pallete.neutral.dark;
let primaryLight = themeProperties.value.pallete.primary.light;
let primary = themeProperties.value.pallete.primary.main;
let primaryDark = themeProperties.value.pallete.primary.dark;
let background = themeProperties.value.pallete.background.default;
let alt = themeProperties.value.pallete.background.alt;
let fontColor = themeProperties.value.pallete.fontColor;

// Props
const props = defineProps({
    postId: {
        type: String
    },
    comments: {
        type: Array
    }
})


let inputText = "";

let comments = ref(props.comments);


async function handleSendComment(){
    try{
        let response = await fetch("http://localhost:3001/posts/" + props.postId+ '/comment', {
                method: 'PATCH',
                headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${store.token}`
                    },
                body: JSON.stringify({
                    userId: user._id,
                    text: inputText
                })
            }
        );

        if(response.status != 200){
            toast.error("There was an error");
            return;
        }

        // // Wait 1s
        // const delay = ms => new Promise(res => setTimeout(res, ms));
        // await delay(1000);

        const newComment = await response.json();
        console.log(newComment);
        comments.value.unshift(newComment)
        
        inputText = '';

        console.log(comments.value);

        
    }catch(error){
        console.log(error);
        toast.error(error);
    }
}


</script>

<template>
    <div class="commentSection">
        <ProfileImageWidget class="profilePicture" :email="user.email" size="40px"/>
        <input class="text" v-model="inputText" placeholder="Write your comment">

        
        <v-btn @click="handleSendComment" class="sendButton" rounded="xl" :color="primary">
            Send
        </v-btn>

        <Suspense>
            <div v-for="(thisComment) in comments">
                <h3 v-if="thisComment.userEmail">{{ thisComment.userEmail }}</h3>
                <h4 v-if="thisComment.description">{{ thisComment.description }}</h4>
            </div>
        </Suspense>
        
    </div>
</template>


<style scoped>
.profilePicture{
    margin: 0.5% 2%;
    float: left;
}
.sendButton{
    display: inline;
    margin: 0.7%;
    width: 15%;
    float: right;
    color: white;
}
.text{
    background-color: v-bind(neutralLight);
    width: 70%;
    height: 3rem;
    resize: none;
    border-radius: 1.5rem;
    padding: 2%;
    float: center;
    margin: 0% 1% 0% 1%;
    padding-left: 3%;
}
</style>