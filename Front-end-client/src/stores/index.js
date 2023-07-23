import { defineStore } from 'pinia';
import { ref } from "vue";

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

    const count = ref(1);


    const setMode = () => {
        
        if(mode.value === 'light'){
            console.log("running");
            mode.value = 'dark';
        }
        else{
            mode.value = 'light';
        }
    }



    // actions: {
    //     setMode() {
    //         this.mode = this.mode === 'light' ? 'dark' : 'light';
    //     },

    //     setLogin: (action) => {
    //         this.user = action.payload.user;
    //         this.token = action.payload.token;
    //     },

    //     setLogout: () => {
    //         this.user = null;
    //         this.token = null;
    //     },

    //     setFriends: (action) => {
    //         if(this.user){
    //             this.user.friends = action.payload.friends;
    //         }
    //         else{
    //             console.error("User Friends non-existent");
    //         }
    //     },

    //     setPosts: (action) => {
    //         this.posts = action.payload.posts;
    //     },

    //     setPost: (action) => {
    //         const updatedPosts = this.posts.map((post) => {
    //             if(post._id === action.payload.post_id) {
    //                 return action.payload.post;
    //             }
    //             return post;
    //         })

    //         this.post = updatedPosts;
    //     }
    // },
    return { mode, user, token, count, setMode}
},{
    persist: sessionStorage,
  },)