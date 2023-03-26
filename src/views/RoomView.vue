<template>
  <q-stepper
    v-model="step"
    ref="stepper"
    alternative-labels
    color="primary"
    animated
  >
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
            <RoomsBooking />
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
              <q-card>
                <q-card-section>
                  <div class="text-h6">Confirm your reservation</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-list>
                    <q-item>
                      <q-item-label>Full Name</q-item-label>
                      <q-item-section>
                        <q-input v-model="payload.fullName.value" />
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-label>Email</q-item-label>
                      <q-item-section>
                        <q-input v-model="payload.email.value" />
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-label>Date Start</q-item-label>
                      <q-item-section>
                        <q-input v-model="payload.dateStart.value" />
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-label>Date End</q-item-label>
                      <q-item-section>
                        <q-input v-model="payload.dateEnd.value" />
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-label>Event Type</q-item-label>
                      <q-item-section>
                        <q-select
                          v-model="payload.eventType.value"
                          :options="eventTypes"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-label>Reserved For</q-item-label>
                      <q-item-section>
                        <q-input v-model="payload.reservedFor.value" />
                      </q-item-section>
                    </q-item>
                  </q-list>

                  <!-- <q-item v-for="(value, key) in filteredPayload" :key="key">
        <q-item-label>{{ key }}:</q-item-label>
        <q-item-label caption>{{ value }}</q-item-label>
      </q-item> -->
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                  <q-btn
                    flat
                    label="Confirm Reservation"
                    @click="confirmReservation()"
                    v-close-popup
                  />
                  <q-btn flat label="Close" v-close-popup />
                </q-card-actions>
              </q-card>
            </div>
            <!-- <RoomsBookingConfirmation
              :payload="payload"
              @create-reservation="createRoomReservation()"
            /> -->
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
      Try out different ad text to see what brings in the most customers, and
      learn how to enhance your ads using features like ad extensions. If you
      run into any problems with your ads, find out how to tell if they're
      running and how to resolve approval issues.
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
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import Api from "@/api/Api";

import store from "../store/index.js";
import { useStore } from "vuex";

import RoomsBooking from "@/components/RoomsBooking.vue";
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

const nameRef = ref();

const nameRules = [(val) => (val && val.length > 0) || "Please type something"];

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
console.log("PAYLOAD CHECK", payload);

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
