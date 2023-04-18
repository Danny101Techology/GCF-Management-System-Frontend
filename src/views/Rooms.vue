<template>
  <div class="q-pa-md">
    <RoomsTable :rooms="rooms" :isLoading="roomsLoading" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import Api from "@/api/Api";
import RoomsTable from "@/components/RoomsTable.vue";

const rooms = ref([]);
const roomsLoading = ref(true);

function retrieveFromAPI() {
  Api.getAllRooms()
    .then((response) => {
      rooms.value = response.data.data;
      roomsLoading.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  retrieveFromAPI();
});

  
</script>
