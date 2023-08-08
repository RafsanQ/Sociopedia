<script setup>
import { ref, onBeforeMount } from 'vue';
import { useCentralStore } from '../../stores';
import ProfileImageWidget from './ProfileImageWidget.vue'


const store = useCentralStore();
const user = store.user;


async function handleRemoveFriend(friendId){
    try{
        const response = await fetch("http://localhost:3001/users/" + user._id + "/friends",{
            method: 'GET',
            headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${store.token}`
                    }
        });

        friends.value = await response.json();
        console.log(friends);
    }catch(error){
        console.error(error);
    }
}


let friends = ref([]);

async function getFriends(userId) {
    try{
        const response = await fetch("http://localhost:3001/users/" + user._id + "/friends",{
            method: 'GET',
            headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${store.token}`
                    }
        });
        
        friends.value = await response.json();
    }catch(error){
        console.error(error);
    }
}

onBeforeMount(getFriends);

 
</script>

<template>
    <h3 class="widgetTitle">Friends</h3>
    <br>
    <Suspense>
        <div v-for="friend in friends" class="slot">
            <div class="info">
                <ProfileImageWidget :email="friend.email" size="50px" />
                <h3>{{ friend.firstName }} {{ friend.lastName  }}</h3>
                <p>{{ friend.occupation }}</p>
            </div>
            <div class="button">
                <v-btn density="compact" icon="md:remove" />
            </div>
        
        </div>
    </Suspense>
</template>



<style scoped>

.widgetTitle{
    margin: 1% 4%;
}
.slot{
    overflow: auto;
    text-align: left;
    padding: 2%;
}
.info{
    display: inline;
    float: left;
    width: 80%;
}

.button{
    display: inline;
    float: right;
    margin: 5% 2%;
}

</style>