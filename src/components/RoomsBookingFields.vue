<template>
  <div class="q-pa-md">
    <div class="title">Create booking</div>
    <q-input
      ref="nameRef"
      color="primary"
      v-model="fullName"
      label="Full name"
      lazy-rules
      :rules="nameRules"
    >
      <template v-slot:prepend>
        <q-icon name="person" />
      </template>
    </q-input>

    <q-input
      color="primary"
      v-model="email"
      label="Email"
      :rules="[(val, rules) => rules.email(val) || 'Please enter a valid email address']"
    >
      <template v-slot:prepend>
        <q-icon name="mail" />
      </template>
    </q-input>

    <!-- Date pickers -->
    <q-input v-model="dateStart" label="Starting Date/Time" filled>
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="dateStart" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="dateStart" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input v-model="dateEnd" label="Ending Date/Time" filled>
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="dateEnd" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="dateEnd" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <!-- Select types -->
    <q-select
      color="primary"
      v-model="eventType"
      :options="eventTypeNames"
      label="Type of Event"
    >
      <template v-slot:prepend>
        <q-icon name="event" />
      </template>
    </q-select>

    <q-select
      color="primary"
      v-model="reservedFor"
      :options="reservedForNames"
      label="Reserved for"
    >
      <template v-slot:prepend>
        <q-icon name="group" />
      </template>
    </q-select>
  </div>
</template>
<script setup props="bookingData">
import axios from "axios";
import { useRoute } from "vue-router";
import { ref, computed, onMounted, watchEffect, defineEmits } from "vue";
import { useStore } from "vuex";
import Api from "@/api/Api.js";

const fullName = ref(localStorage.getItem("fullName") || "");
const email = ref(localStorage.getItem("email") || "");
const dateStart = ref(localStorage.getItem("dateStart") || "");
const dateEnd = ref(localStorage.getItem("dateEnd") || "");
const eventType = ref(localStorage.getItem("eventType") || "");
const reservedFor = ref(localStorage.getItem("reservedFor") || "");

const route = useRoute();

const nameRef = ref();

const emit = defineEmits(["booking-data-updated"]);

const nameRules = [(val) => (val && val.length > 0) || "Please type something"];

// const accept = ref();

const bookingData = computed(() => {
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

// localStorage.setItem('bookingPayload', JSON.stringify(payload.value));

const eventTypes = ref([]);
const eventTypeIds = computed(() => eventTypes.value.map((eventType) => eventType.id));
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

// function createRoomReservation() {
//   let reservation = {
//     data: {
//       room_id: route.params.room,
//       fullName: fullName.value,
//       email: email.value,
//       dateStart: dateStart.value,
//       dateEnd: dateEnd.value,
//       eventType: eventType.value,
//       reservedFor: reservedFor.value,
//     },
//   };
//   Api.createRoomsReservations(reservation)
//     .then((response) => {
//       // PUT CODE HERE FOR ALERTING SUCCESSFUL RESERVATION
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

watchEffect(() => {
  console.log("bookingData CHECK", bookingData.value);
  emit("booking-data-updated", bookingData.value);
  localStorage.setItem("fullName", fullName.value);
  localStorage.setItem("email", email.value);
  localStorage.setItem("dateStart", dateStart.value);
  localStorage.setItem("dateEnd", dateEnd.value);
  localStorage.setItem("eventType", eventType.value);
  localStorage.setItem("reservedFor", reservedFor.value);
});

onMounted(() => {
  console.log("RoomsBooking.vue have been mounted!");
  retrieveEventTypesFromAPI();
  retrieveReservedForFromAPI();
});
</script>
