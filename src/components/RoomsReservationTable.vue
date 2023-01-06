<template>
  <q-table
    title="Rooms Reservation"
    :rows="rows"
    :columns="columns"
    :filter="filter"
    row-key="id"
  >
    <template v-slot:top-right>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template v-slot:body-cell-schedule="props" dense>
      <q-td>
        <!-- <router-link
            style="text-decoration: none; color: inherit"
            :to="{ name: 'room-view', params: { room: props.row.id } }"
          > -->
        <q-btn size="sm" color="green" label="Cancel" @click="removeReservations(room_id)" dense />
        <!-- </router-link> -->
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";

import Api from "@/api/Api";

const props = defineProps({
  roomreservations: Array,
});
const filter = ref("");
const columns = [
  {
    name: "fullname",
    align: "left",
    label: "Full Name",
    field: "fullname",
    sortable: true,
  },
  {
    name: "RoomCode",
    align: "left",
    label: "Room Code",
    field: "room_code",
    sortable: true,
  },
  {
    name: "reservation_type",
    align: "left",
    label: "Reservation Type",
    field: "reservation_type",
    sortable: true,
  },
  {
    name: "event_type",
    align: "left",
    label: "Event Type",
    field: "event_type",
    sortable: true,
  },
  {
    name: "startingdatetime",
    align: "left",
    label: "Starting Date Time",
    field: "startingdatetime",
  },
  {
    name: "endingdatetime",
    align: "left",
    label: "Ending Date Time",
    field: "endingdatetime",
  },
  {
    name: "schedule",
    align: "left",
    label: "",
    field: "schedule",
  },
];

const removeReservations = ref();

function removeReservationsFromAPI() {
  Api.removeReservations(room_id)
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error.response);
    });
}

const rows = computed(() => {
  let data = props.roomreservations.map((roomreservation) => {
    return {
      id: roomreservation.id,
      fullname: roomreservation.attributes.fullname,
      room_code: roomreservation.attributes.room_code,
      reservation_type: roomreservation.attributes.reservation_type,
      event_type: roomreservation.attributes.event_type,
      startingdatetime: roomreservation.attributes.startingdatetime,
      endingdatetime: roomreservation.attributes.endingdatetime,
    };
  });
  console.log(data);
  return data;
});

onMounted(() => {
  console.log("RoomsReservationTable.vue have been mounted!");
  console.log(props.roomsreservations);
});
</script>
