<template>
  <q-layout view="hHh lpR fFf">
     <HeaderWow />
 
     <q-page-container>
       <router-view></router-view>
     </q-page-container>
  </q-layout>
 </template>
 
 <script>
 import { ref, onMounted } from "vue";
 import { PanoViewer, SpinViewer } from "@egjs/vue3-view360";
 import { library } from '@fortawesome/fontawesome-svg-core'
 import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
 import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 import HeaderWow from "@/components/HeaderWow.vue";
 
 
 export default {
   components: { HeaderWow }
 
 
 
     
 
 
   }
 
 </script>
 