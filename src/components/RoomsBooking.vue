<template>
  <RoomsBookingFields />

  <div class="q-pa-md">
    <RoomsBookingConfirmation
      :payload="payload"
      @create-reservation="createRoomReservation()"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from 'vue-router';
import { ref, computed, onMounted } from "vue";
import store from "../store/index.js";
import { useStore } from "vuex";
import Api from "@/api/Api.js";

import RoomsBookingFields from "@/components/RoomsBookingFields.vue";
import RoomsBookingConfirmation from "@/components/RoomsBookingConfirmation.vue";
import RoomsBookingCheckboxes from "@/components/RoomsBookingCheckboxes.vue";

const route = useRoute();

const fullName = ref();
const email = ref();
const dateStart = ref();
const dateEnd = ref();
const eventType = ref();
const reservedFor = ref();

const nameRef = ref();

const nameRules = [val => (val && val.length > 0) || 'Please type something'];

const accept = ref();

const payload = computed(() => {
  return {
    room_id: route.params.room,
    fullName: fullName.value,
    email: email.value,
    dateStart: dateStart.value,
    dateEnd: dateEnd.value,
    eventType: eventType.value,
    reservedFor: reservedFor.value,
  };
});
console.log("PAYLOAD CHECK", payload)


const eventTypes = ref([]);
const eventTypeIds = computed(() =>
  eventTypes.value.map((eventType) => eventType.id)
);
const eventTypeNames = computed(() =>
  eventTypes.value.map((eventType) => eventType.name)
);

function retrieveEventTypesFromAPI() {
  Api.getAllEventTypes()
    .then((response) => {
      eventTypes.value = response.data.data.map((eventType) => {
        return {
          id: eventType.id,
          name: eventType.attributes.name,
          reserved: eventType.attributes.reserved,
        };
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

const reservedFors = ref([]);
const reservedForIds = computed(() =>
  reservedFors.value.map((reservedFor) => reservedFor.id)
);
const reservedForNames = computed(() =>
  reservedFors.value.map((reservedFor) => reservedFor.name)
);
function retrieveReservedForFromAPI() {
  Api.getAllReservedFors()
    .then((response) => {
      reservedFors.value = response.data.data.map((reservedFor) => {
        return {
          id: reservedFor.id,
          name: reservedFor.attributes.name,
        };
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function createRoomReservation() {
  let reservation = {
    data: {
      room_id: route.params.room,
      fullName: fullName.value,
      email: email.value,
      dateStart: dateStart.value,
      dateEnd: dateEnd.value,
      eventType: eventType.value,
      reservedFor: reservedFor.value,
    }
  };
  Api.createRoomsReservations(reservation)
    .then((response) => {
      // PUT CODE HERE FOR ALERTING SUCCESSFUL RESERVATION
    })
    .catch((error) => {
      console.log(error);
    })
}








onMounted(() => {
  console.log("RoomsBooking.vue have been mounted!");
  retrieveEventTypesFromAPI();
  retrieveReservedForFromAPI();
});
</script>
