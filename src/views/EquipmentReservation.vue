<template>
    <div v-if="isAuthenticated" class="q-pa-md">
      <div>
        <EquipmentsReservationTable :equipmentsreservations="equipmentsreservations" />
      </div>
    </div>
    <q-alert v-else color="negative">403 Forbidden</q-alert>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import Api from "@/api/Api";
  import EquipmentsReservationTable from "@/components/EquipmentsReservationTable.vue";
  
  const equipmentsreservations = ref([]);
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  
  function retrieveFromAPI() {
    Api.getAllEquipmentsReservations()
      .then((response) => {
        equipmentsreservations.value = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  onMounted(() => {
    console.log("EquipmentsReservationTable.vue has been mounted!");
    if (!isAuthenticated) {
      return new Response("Forbidden", { status: 403 });
    }
    retrieveFromAPI();
  });
  </script>
  