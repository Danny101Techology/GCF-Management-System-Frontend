<template>
  <div v-if="isAuthenticated" class="q-pa-md">
    <div>
      <RoomsReservationTable :roomsreservations="roomsreservations" />
    </div>
  </div>
  <q-alert v-else color="negative">403 Forbidden</q-alert>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Api from "@/api/Api";
import RoomsReservationTable from "@/components/RoomsReservationTable.vue";

const roomsreservations = ref([]);
const isAuthenticated = localStorage.getItem("isAuthenticated");

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
  console.log("RoomsReservation.vue has been mounted!");
  if (!isAuthenticated) {
    return new Response("Forbidden", { status: 403 });
  }
  retrieveFromAPI();
});
</script>
