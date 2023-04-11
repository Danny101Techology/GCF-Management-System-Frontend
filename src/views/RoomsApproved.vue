<template>
  <div v-if="isAuthenticated" class="fit row wrap items-start content-start">
    <div class="q-pa-md">
      <RoomsApprovedTable :rows="approvedRows" />
    </div>
  </div>
  <q-alert v-else color="negative">403 Forbidden</q-alert>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Api from "@/api/Api";
import RoomsApprovedTable from "@/components/RoomsApprovedTable.vue";

const roomsreservations = ref([]);
const isAuthenticated = localStorage.getItem("isAuthenticated");

function retrieveFromAPI() {
  Api.getAllRoomsApproved()
    .then((response) => {
      roomsreservations.value = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  console.log("RoomsApproved.vue has been mounted!");
  if (!isAuthenticated) {
    return new Response("Forbidden", { status: 403 });
  }
  retrieveFromAPI();
});
</script>
