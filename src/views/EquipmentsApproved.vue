<template>
    <div v-if="isAuthenticated" class="q-pa-md">
      <div>
        <EquipmentsApprovedTable :equipmentsapproveds="equipmentsapproveds" />
      </div>
    </div>
    <q-alert v-else color="negative">403 Forbidden</q-alert>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import Api from "@/api/Api";
  import EquipmentsApprovedTable from "@/components/EquipmentsApprovedTable.vue";
  
  const equipmentsapproveds = ref([]);
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  
  function retrieveFromAPI() {
    Api.getAllEquipmentApproved()
      .then((response) => {
        equipmentsapproveds.value = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  onMounted(() => {
    console.log("EquipmentsApprovedTable.vue has been mounted!");
    if (!isAuthenticated) {
      return new Response("Forbidden", { status: 403 });
    }
    retrieveFromAPI();
  });
  </script>
  