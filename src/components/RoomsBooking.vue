<template>
  <div class="q-pa-md">
    <div class="title">Create booking</div>

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">

      <!-- Input textfields -->
      <q-input color="primary" v-model="fullName" label="Full name">
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>

      <q-input color="primary" v-model="email" label="Email">
        <template v-slot:prepend>
          <q-icon name="mail" />
        </template>
      </q-input>

      <!-- Date pickers -->
      <q-input v-model="dateStart" label="Starting Date" filled>
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
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
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input v-model="dateEnd" label="Ending Date" filled>
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
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
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
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
    </q-form>
  </div>

  <div class="q-pa-md">
    <RoomsBookingConfirmation />
    <!-- <div class="q-pa-md">
      <q-btn label="Reserve" color="primary" @click="reserve = true" />

      <q-dialog v-model="reserve">
        <q-card>
          <q-card-section>
            <div class="text-h6">Confirm your reservation</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ payload }}
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn
              flat
              label="Open another dialog"
              @click="secondDialog = true"
            />
            <q-btn flat label="Close" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div> -->
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed, onMounted } from "vue";

import RoomsBookingConfirmation from "@/components/RoomsBookingConfirmation.vue";



const eventTypes = ref([]);
const eventTypeIds = computed(() =>
  eventTypes.value.map((eventType) => eventType.id)
);
const eventTypeNames = computed(() =>
  eventTypes.value.map((eventType) => eventType.name)
);

function retrieveEventTypesFromAPI() {
  axios.defaults.baseURL = process.env.VUE_APP_API_URI;
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${process.env.VUE_APP_API_TOKEN}`;
  axios
    .get(`api/event-types`)
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
  axios.defaults.baseURL = process.env.VUE_APP_API_URI;
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${process.env.VUE_APP_API_TOKEN}`;
  axios
    .get(`api/reserved-fors`)
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

onMounted(() => {
  console.log("RoomsBooking.vue have been mounted!");
  retrieveEventTypesFromAPI();
  retrieveReservedForFromAPI();
});
</script>
