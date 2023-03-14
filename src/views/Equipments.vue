<template>
  <div class="q-pa-md">
    <EquipmentsTable :equipments="equipments" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import EquipmentsTable from "@/components/EquipmentsTable.vue";
import Api from "@/api/Api";

const equipments = ref([]);

function retrieveFromAPI() {
  Api.getAllEquipments()
    .then((response) => {
      equipments.value = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  console.log("Equipments.vue have been mounted!");
  retrieveFromAPI();
});
</script>
