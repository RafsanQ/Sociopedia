<template>
    <div class="body">
        <StyledText v-if="showText" class="text"><slot /></StyledText>
        <StyledInput class="inputFile" type="file" :accept="`${inputType}/*`" @change=uploadImage />
        <img v-if="inputType == 'image'" :src="previewImage" class="uploading-media" />
        <video v-if="inputType == 'video'" :src="previewImage" class="uploading-media" controls />
        <video v-if="inputType == 'audio'" :src="previewImage" class="uploading-media-audio" controls />
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
            StyledInput,
         },
         props: {
            width: {
                type: String,
                default: '50%'
            },
            showText: {
                type: Boolean,
                default: false
            },
            inputType: {
                String,
                default: 'image'
            }
         },
         setup(props){
            
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
                    this.$emit('inputMedia', this.previewImage);
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

    .body .uploading-media{
        display: block;
        width: 90%;
        height: auto;
        margin: auto;
    }

    .body .uploading-media-audio{
        display: block;
        width: 90%;
        height: 5rem;
        margin: auto;
    }
  </style>