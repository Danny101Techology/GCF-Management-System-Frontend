<template>
  <div class="q-pa-md">
    <div class="title">Create booking</div>

    <!-- @submit.prevent.stop="onSubmit" -->
    <q-form 
      
      class="q-gutter-md"
      >
      <!-- Input textfields -->
      
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
        :rules="[ (val, rules) => rules.email(val) || 'Please enter a valid email address' ]"
        >
        <template v-slot:prepend>
          <q-icon name="mail" />
        </template>
      </q-input>

      <!-- Date pickers -->
      <q-input v-model="dateStart" label="Starting Date/Time" filled>
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
    </q-form>
  </div>

  <div class="q-pa-md">
    <EquipmentsBookingConfirmation :payload="payload" />
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from 'vue-router';
import { ref, computed, onMounted } from "vue";

import EquipmentsBookingConfirmation from "@/components/EquipmentsBookingConfirmation.vue";
import Api from "@/api/Api";

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
    equipment_id: useRoute().params.name,
    fullName: fullName.value,
    email: email.value,
    dateStart: dateStart.value,
    dateEnd: dateEnd.value,
    eventType: eventType.value,
    reservedFor: reservedFor.value,
  };
});

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

// Form Validation

// const onSubmit = onSubmit(() => {
//   nameRef.value.validate()

//   if (nameRef.value.hasError) {
//           // form has error
//   }

//   else if (accept.value !== true) {
//     q.notify({
//       color: 'negative',
//       message: 'You need to accept the license and terms first'
//     })
//   }
//   else {
//     $q.notify({
//       icon: 'done',
//       color: 'positive',
//       message: 'Submitted'
//     })
//   }
// });





onMounted(() => {
  console.log("EquipmentsBooking.vue have been mounted!");
  retrieveEventTypesFromAPI();
  retrieveReservedForFromAPI();
});
</script>
