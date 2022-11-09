<template>
  <div class="q-pa-md">
    <RoomsTable :rooms="rooms" />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

import RoomsTable from "@/components/RoomsTable.vue";

const rooms = ref([]);

function retrieveFromAPI() {
  axios.defaults.baseURL = process.env.VUE_APP_API_URI;
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${process.env.VUE_APP_API_TOKEN}`;
  axios
    .get(`rooms`)
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
//
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//

// import ReserveDialog from "@/components/ReserveDialog.vue";
// import Calendar from "@/components/Calendar.vue";
</script>
