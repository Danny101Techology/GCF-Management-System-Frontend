<template>
  <q-stepper v-model="step" ref="stepper" alternative-labels color="primary" animated>
    <q-step
      :name="1"
      :title="`${site} > ${name}`"
      :caption="`${capacity} pax`"
      icon="settings"
      :done="step > 1"
    >
      <q-splitter v-model="splitterModel" :limits="[50, 100]">
        <template v-slot:before>
          <div>
            <RoomsBookingCarousel :room="room" />
          </div>
        </template>

        <template v-slot:after>
          <div style="width: 100%; overflow: auto">
            <RoomsBookingFields
              @booking-data-updated="onBookingDataUpdated"
              :bookingData="bookingData"
            />
          </div>
        </template>
      </q-splitter>
    </q-step>
    <q-step
      :name="2"
      title="Specify your reservation details"
      icon="create_new_folder"
      :done="step > 2"
    >
      <q-splitter v-model="splitterModel" :limits="[50, 100]">
        <template v-slot:after>
          <div>
            <div class="q-pa-md">
              <RoomsBookingConfirmation :payload="payloadData" />
            </div>
          </div>
        </template>

        <template v-slot:before>
          <div>
            <RoomsBookingCheckboxes />
          </div>
        </template>
      </q-splitter>
    </q-step>
    <q-step :name="3" title="Create an ad" icon="add_comment">
      Try out different ad text to see what brings in the most customers, and learn how to
      enhance your ads using features like ad extensions. If you run into any problems
      with your ads, find out how to tell if they're running and how to resolve approval
      issues.
    </q-step>

    <template v-slot:navigation>
      <q-stepper-navigation>
        <q-btn
          @click="$refs.stepper.next()"
          color="primary"
          :label="step === 3 ? 'Finish' : 'Continue'"
        />
        <q-btn
          v-if="step > 1"
          flat
          color="primary"
          @click="$refs.stepper.previous()"
          label="Back"
          class="q-ml-sm"
        />
      </q-stepper-navigation>
    </template>
  </q-stepper>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import Api from "@/api/Api";

// import store from "../store/index.js";
// import { useStore } from "vuex";

import RoomsBookingFields from "@/components/RoomsBookingFields.vue";
import RoomsBookingCarousel from "@/components/RoomsBookingCarousel.vue";
import RoomsBookingConfirmation from "@/components/RoomsBookingConfirmation.vue";
import RoomsBookingCheckboxes from "@/components/RoomsBookingCheckboxes.vue";

//General Stuff
const room = ref([]);
const route = useRoute();
const room_id = route.params.room;
//Components
const step = ref(1);
const splitterModel = ref(50);

const name = computed(() => room.value.name);
const capacity = computed(() => room.value.capacity);
const site = computed(() => room.value.site);

const fullName = ref();
const email = ref();
const dateStart = ref();
const dateEnd = ref();
const eventType = ref();
const reservedFor = ref();


const onBookingDataUpdated = function(i){
  console.log("ON BOOKING DATA UPDATED", i);
  fullName.value = i.fullName;
  email.value = i.email;
  dateStart.value = i.dateStart;
  dateEnd.value = i.dateEnd;
  eventType.value = i.eventType;
  reservedFor.value = i.reservedFor;
};

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
console.log("PAYLOAD CHECK SA ROOMS VIEW", payload.value);

// define the required keys for payloadData
const payloadDataKeys = [
  "full_name",
  "email",
  "date_start",
  "date_end",
  "event_type",
  "reserved_for",
];

// create the computed property
const payloadData = computed(() => {
  const mappedData = {};
  for (const key of payloadDataKeys) {
    mappedData[key] = payload[key] || "";
  }
  return mappedData;
});

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
    },
  };
  Api.createRoomsReservations(reservation)
    .then((response) => {
      // PUT CODE HERE FOR ALERTING SUCCESSFUL RESERVATION
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

//API

function retrieveFromAPI() {
  Api.getRoomById(room_id)
    .then((response) => {
      console.log(response.data.data.attributes);
      let id = response.data.data.id;
      let attributes = response.data.data.attributes;
      let images;
      if (response.data.data.attributes.images.data) {
        images = response.data.data.attributes.images.data.map((img) => {
          let data = {
            name: img.attributes.name,
            url: `${process.env.VUE_APP_API_URI}${img.attributes.url}`,
          };
          return data;
        });
      }

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
