<template>
  <div class="q-pa-md">
    <EquipmentsTable :equipments="equipments" />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

import EquipmentsTable from "@/components/EquipmentsTable.vue";

const equipments = ref([]);

function retrieveFromAPI() {
  axios.defaults.baseURL = process.env.VUE_APP_API_URI;
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${process.env.VUE_APP_API_TOKEN}`;
  axios
    .get(`equipment`)
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
//
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//

// import ReserveDialog from "@/components/ReserveDialog.vue";
// import Calendar from "@/components/Calendar.vue";
</script>
