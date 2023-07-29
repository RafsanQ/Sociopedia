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
    const posts = ref([]);


    const setMode = () => {
        
        if(mode.value === 'light'){
            mode.value = 'dark';
        }
        else{
            mode.value = 'light';
        }
    }

    const setLogin = (action) => {
        this.user.value = action.payload.user;
        this.token.value = action.payload.token;
    }

    const setLogout = () => {
        this.user.value = null;
        this.token.value = null;
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


    return { mode, user, token, count, setMode, setLogin, setLogout, setFriends, setPosts, setPost };
},{
    persist: sessionStorage,
  },)