<template>
  <!--Date-->
  <div class="q-pa-md">
    
      <div class="q-gutter-md row items-start">
        <q-date v-model="date" range />
      </div>
    

    <!--Time-->
    <div class="q-pa-md">
      <div class="q-gutter-sm row">
        <q-input filled v-model="timefrom" mask="time" :rules="['time']">
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time v-model="timefrom">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input filled v-model="timeto" mask="time" :rules="['time']">
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time v-model="timeto">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>


    <!--Event-->
    <div class="q-pa-md">
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-select
          color="purple-12"
          v-model="model"
          :options="eventTypeNames"
          label="Type of Event"
        >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-select>
      </div>
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-select
          color="purple-12"
          v-model="model"
          :options="eventTypeReserveds"
          label="Reserved for"
        >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-select>
      </div>
    </div>



  
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  room: Object,
});

const name = computed(() => props.room.name);
const capacity = computed(() => props.room.capacity);
const site = computed(() => props.room.site);
const available = computed(() => props.room.available);
const images = computed(() => props.room.images);

const date = ref();
const timefrom = ref();
const timeto = ref();
const model = ref();

function createPayload() {
  let payload = {};

  payload.date = date.value;
  payload.timefrom = timefrom.value;
  payload.timeto = timeto.value;
  payload.model = model.value;

  return payload;
}

const eventTypes = ref([]);
const eventTypeIds = computed(() =>
  eventTypes.value.map((eventType) => eventType.id)
);
const eventTypeReserveds = computed(() =>
  eventTypes.value.map((eventType) => eventType.reserved)
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

onMounted(() => {
  console.log("RoomsDialog.vue have been mounted!");
  console.log(props.room);
  retrieveEventTypesFromAPI();
});
</script>
