<script setup>
import { ref  } from "vue";
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
        const newComment = await response.json();
        if(response.status != 200){
        
            toast.error("There was an error");
            console.log(newComment);
            return;
        }

        
        console.log(newComment);
        comments.value.unshift(newComment)
        
        inputText = '';

        console.log(comments.value);

        
    }catch(error){
        console.log(error);
        toast.error(error);
    }
}

function getTimeDifference(updatedTime){
    var date1 = new Date();
    var date2 = new Date(updatedTime);

    console.log({ date1, date2})
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
    <div class="commentSection">
        <div class="slot">
            <ProfileImageWidget class="profilePicture" :email="user.email" size="40px"/>
            <input class="commentTextInput" v-model="inputText" placeholder="Write your comment">
            
            <v-btn @click="handleSendComment" class="sendButton" rounded="xl" :color="primary">
                Send
            </v-btn>
        </div>

        
        <Suspense class="slot">
            
            <div c v-for="(thisComment) in comments" :key="thisComment._id">
                <ProfileImageWidget class="profilePicture" :email="thisComment.userEmail" size="40px"/>
                <p class="commentText">{{ thisComment.text }}</p>
                <p class="time" v-if="thisComment.updated">{{ getTimeDifference(thisComment.updated) }}</p>
            </div>
        </Suspense>
        
    </div>
</template>


<style scoped>
.slot{
    display: block;
    margin: 2% 1%;
}
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

.commentTextInput{
    background-color: v-bind(neutralLight);
    width: 70%;
    height: 3rem;
    resize: none;
    border-radius: 1.5rem;
    padding: 2%;
    margin: 0% 1% 0% 1%;
    padding-left: 3%;
}
.commentText{
    background-color: v-bind(neutralLight);
    width: clamp(80%, 70%, 60%);
    height: 3.5rem;
    border-radius: 1.5rem;
    padding: 2%;
    margin: 3% 5% 1% 9%;
    padding-left: 4%;
}

.time{
    margin: 0.2% 2% 0.5% 11%;
}


</style>