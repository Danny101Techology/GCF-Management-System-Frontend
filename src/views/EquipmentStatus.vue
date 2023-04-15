<template>
    <div v-if="isAuthenticated" class="q-pa-md">
      <div>
        <EquipmentsStatusTable :equipmentstatus="equipmentstatus" />
      </div>
    </div>
    <q-alert v-else color="negative">403 Forbidden</q-alert>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import Api from "@/api/Api";
  import EquipmentsStatusTable from "@/components/EquipmentsStatusTable.vue";
  
  const equipmentstatus = ref([]);
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  
  function retrieveFromAPI() {
    Api.getAllEquipmentStatus()
      .then((response) => {
        equipmentstatus.value = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  onMounted(() => {
    console.log("EquipmentStatus.vue has been mounted!");
    if (!isAuthenticated) {
      return new Response("Forbidden", { status: 403 });
    }
    retrieveFromAPI();
  });
  </script>
  