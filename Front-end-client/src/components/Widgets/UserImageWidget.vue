<script setup>

const props = defineProps({
    email: String,
    size: String
})

const size = props.size;
const imgSrc = 'http://localhost:3001/assets/profilepictures/' + props.email + '.png';

</script>

<template>
    <div class="box">
        <img class="image" :src="imgSrc" alt="user" />
    </div>
</template>


<style scoped>
.box {
    width: v-bind(size);
    height: v-bind(size);
}

.image{
    object-fit: "cover";
    border-radius: 50%;
    width: v-bind(size);
    height: v-bind(size);
}
</style>