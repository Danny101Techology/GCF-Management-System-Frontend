<template>
    <div class="fit row wrap items-start content-start">
      <div class="col-8" style="overflow: auto;">
        <EquipmentsInfo :equipment="equipment" />
      </div>
      <div class="col-4" style="overflow: auto;">
        <EquipmentsBooking />
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  import EquipmentsBooking from "@/components/EquipmentsBooking.vue";
  import EquipmentsInfo from "@/components/EquipmentsInfo.vue";
  
  const equipment = ref([]);
  const route = useRoute();
  const equipment_id = route.params.equipment;
  
  function retrieveFromAPI() {
    axios.defaults.baseURL = process.env.VUE_APP_API_URI;
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${process.env.VUE_APP_API_TOKEN}`;
    axios
      .get(`api/equipments/${equipment_id}?populate=images`)
      .then((response) => {
        console.log(response.data.data.attributes);
        let id = response.data.data.id;
        let attributes = response.data.data.attributes;
        let images = response.data.data.attributes.images.data.map(
          (img) => {
            let data = {
              name: img.attributes.name,
              url: `${process.env.VUE_APP_API_URI}${img.attributes.url}`
            }
            return data;
          }
        );
  
        equipment.value = {
          id: id,
          equipment: attributes.equipment,
          type: attributes.equipment_type,
          subtype: attributes.equipment_subtype,
          images: images,
        };
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  onMounted(() => {
    retrieveFromAPI();
  });
  </script>
  