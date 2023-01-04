<template>
    <div class="q-pa-md">
      <RoomsTableReservation :rooms="rooms" />
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref, onMounted } from "vue";
  
  import RoomsTableReservation from "@/components/RoomsTableReservaton.vue";
  
  const rooms = ref([]);
  
  function retrieveFromAPI() {
    axios.defaults.baseURL = process.env.VUE_APP_API_URI;
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${process.env.VUE_APP_API_TOKEN}`;
    axios
      .get(`api/roomsreservations`)
      .then((response) => {
        rooms.value = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  onMounted(() => {
    console.log("RoomsReservation.vue have been mounted!");
    retrieveFromAPI();
  });
  
    
  </script>
  