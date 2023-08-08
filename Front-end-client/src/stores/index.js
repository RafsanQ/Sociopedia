import { defineStore } from 'pinia';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import { ref } from "vue";

// For Routing stuff and refresh
import { useRouter } from 'vue-router';
const router = useRouter()


// For toast Notifications and messages
const toast = useToast();



export const useCentralStore = defineStore('centralStore', () => {
    // state: () => ({
    //     mode: 'light',
    //     user: null,
    //     token: null,
    //     posts: []
    // }),

    const mode = ref('light');
    const user = ref(null);
    const token = ref(null);
    const posts = ref([]);


    const setMode = () => {
        
        if(mode.value === 'light'){
            mode.value = 'dark';
        }
        else{
            mode.value = 'light';
        }
    }

    const setLogin = async (userForm) => {

        const response = await fetch("http://localhost:3001/auth/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userForm)
        })

        const responseData = await response.json();

        if(response.status == 200 || response.status == 201){
            user.value = responseData.user;
            token.value = responseData.token;

            toast.success('Login successful');

            // Wait 0.1s
            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(100);
            
            location.reload();
        }
        else {
            toast.error(responseData.message);
        }

        // this.user.value = action.payload.user;
        // this.token.value = action.payload.token;
    }

    const setLogout = () => {
        user.value = null;
        token.value = null;
    }

    const register = async (userForm) => {
        
        try{
            const response = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userForm)
            });
            
            if(response.status == 200 || response.status == 201){
                toast.success('Registration successful');
                
                // Wait 0.1s
                const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(100);

                location.reload();
                
            }

            else if(response.status == 400){
                toast.error('Email Already Registered');
            }

            else{
                toast.error('Server Error');
            }

        }catch(error){
            return error;
        }
        
        
    }

    const setFriends = (newFriednsList) => {
        if(user.value){
            user.value.friends = newFriednsList;
        }
        else{
            console.error("User Friends non-existent");
        }
    }

    const getFriends = () => {
        if(user.value){
            return user.value.friends;
        }
        else{
            toast.error('User not signed in');
        }
    }

    const addFriend = (newFriendId) => {
        if(user.value){
            console.log(user.value.friends);
            user.value.friends.push(newFriendId);
        }
        else{
            console.error("User Friends non-existent");
        }
    }

    const removeFriend = (friendId) => {
        if(user.value.friends.includes(friendId)){
            user.value.friends = user.value.friends.filter(
                (id) => id !== friendId
            )
        }
        else{
            toast.error("Sync with database failure. Please log out and try again");
        }
    }
    
    const setPosts = (posts) => {
        posts.value = posts;
    }


    return { mode, user, token, register, setMode, setLogin, setLogout, setFriends, getFriends, addFriend, removeFriend, setPosts };
},{
    persist: true,
  })