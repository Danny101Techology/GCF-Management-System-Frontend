<template>
    <div class="q-pa-md">
      <RoomsReservationTable :roomsreservations="roomsreservations" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  import Api from "@/api/Api";
  import RoomsReservationTable from "@/components/RoomsReservationTable.vue";
  
  const roomsreservations = ref([]);
  
  function retrieveFromAPI() {
  Api.getAllRoomsReservations()
    .then((response) => {
      roomsreservations.value = response.data.data;
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