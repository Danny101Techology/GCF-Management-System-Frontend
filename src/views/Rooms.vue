<template>
  <div class="q-pa-md">
    <RoomsTable :rooms="rooms" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import Api from "@/api/Api";
import RoomsTable from "@/components/RoomsTable.vue";

const rooms = ref([]);

function retrieveFromAPI() {
  Api.getAllRooms()
    .then((response) => {
      rooms.value = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  console.log("Rooms.vue have been mounted!");
  retrieveFromAPI();
});

  
</script>
