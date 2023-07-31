<template>
    <div class="body">
        <StyledText v-if="showText" class="text"><slot /></StyledText>
        <StyledInput class="inputFile" type="file" accept="image/*" @change=uploadImage />
        <img :src="previewImage" class="uploading-image" />
    </div>
 </template>
 
 <script>
    import {
        StyledText,
        StyledTextButton,
        StyledInput
    } from './stylizedFormComponents.js';
    
     export default {
         name:'ImageUploadFieldInput',
         components: {
            StyledText,
            StyledTextButton,
            StyledInput
         },
         props: {
            width: {
                type: String,
                default: '50%'
            },
            showText: {
                type: Boolean,
                default: false
            }
         },
         setup(props){
            const width = props.width;
         },
         data(){
             return{
                previewImage:null
             }
         },
         methods:{
             uploadImage(e){
                 const image = e.target.files[0];
                 const reader = new FileReader();
                 reader.readAsDataURL(image);
                 reader.onload = e =>{
                    this.previewImage = e.target.result;
                    // console.log(this.previewImage);
                    this.$emit('picture', this.previewImage);
                 };
             }
         }
      }  // missing closure added
 </script>
 
 
 
 <style>
    .body{
        display: block;
    }
    .body.text{
        display: inline;
        text-align: left;
        width: 30%;
    }

    .body .inputFile{
        display: inline;
        width: v-bind(width)
    }

    .body .uploading-image{
        display: block;
        width: 90%;
        height: auto;
        margin: auto;
    }
  </style>