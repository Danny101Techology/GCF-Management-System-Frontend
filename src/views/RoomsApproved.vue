<template>
  <div v-if="isAuthenticated" class="q-pa-md">
    <div>
      <RoomsApprovedTable :roomsapproved="roomsapproved" />
    </div>
  </div>
  <q-alert v-else color="negative">403 Forbidden</q-alert>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Api from "@/api/Api";
import RoomsApprovedTable from "@/components/RoomsApprovedTable.vue";

const roomsapproved = ref([]);
const isAuthenticated = localStorage.getItem("isAuthenticated");

function retrieveFromAPI() {
  Api.getAllRoomsApproved()
    .then((response) => {
      roomsapproved.value = response.data.data;
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
