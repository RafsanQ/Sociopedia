import { defineStore } from 'pinia';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
// import fetch from 'cross-fetch';
import { ref } from "vue";



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
        }
        else {
            toast.error(responseData.message);
        }

        // this.user.value = action.payload.user;
        // this.token.value = action.payload.token;
    }

    const setLogout = () => {
        this.user.value = null;
        this.token.value = null;
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
                let instance = toast.success('Registration successful');
            }

            else if(response.status == 400){
                let instance = toast.error('Email Already Registered');
            }

            else{
                let instance = toast.error('Server Error');
            }

        }catch(error){
            return error;
        }
        
        
    }

    const setFriends = (action) => {
        if(this.user.value){
            this.user.value.friends = action.payload.friends;
        }
        else{
            console.error("User Friends non-existent");
        }
    }
    
    const setPosts = (action) => {
        this.posts.value = action.payload.posts;
    }

    const setPost = (action) => {
        const updatedPosts = this.posts.value.map((post) => {
            if(post._id === action.payload.post_id) {
                return action.payload.post;
            }
            return post;
        })

        this.post.value = updatedPosts;
    }


    return { mode, user, token, register, setMode, setLogin, setLogout, setFriends, setPosts, setPost };
},{
    persist: sessionStorage,
  },)