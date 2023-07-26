<template>
    <div class="body">
        <StyledText class="text"><slot /></StyledText>
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
         setup(){
            
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
                     console.log(this.previewImage);
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
        width: 50%;
    }

    .body .uploading-image{
        display: block;
        width: 90%;
        height: auto;
        margin: auto;
    }
  </style>