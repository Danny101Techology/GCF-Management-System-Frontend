<template>
    <div class="fit row wrap items-start content-start">
      <div class="col-8" style="overflow: auto;">
        <EquipmentsInfo :room="room" />
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
  
  const room = ref([]);
  const route = useRoute();
  const room_id = route.params.room;
  
  function retrieveFromAPI() {
    axios.defaults.baseURL = process.env.VUE_APP_API_URI;
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${process.env.VUE_APP_API_TOKEN}`;
    axios
      .get(`api/rooms/${room_id}?populate=images`)
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
  
        room.value = {
          id: id,
          code: attributes.room_code,
          name: attributes.room_name,
          site: attributes.site,
          capacity: attributes.capacity,
          available: attributes.available,
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
  