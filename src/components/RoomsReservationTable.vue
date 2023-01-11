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
        <q-btn size="sm" color="green" label="Cancel" @click="removeReservation(props.row.id)" dense />
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
  roomsreservations: Array,
});
const filter = ref("");
const columns = [
  {
    name: "fullName",
    align: "left",
    label: "Full Name",
    field: "fullName",
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
    name: "reservedFor",
    align: "left",
    label: "Reservation Type",
    field: "reservedFor",
    sortable: true,
  },
  {
    name: "eventType",
    align: "left",
    label: "Event Type",
    field: "eventType",
    sortable: true,
  },
  {
    name: "dateStart",
    align: "left",
    label: "Starting Date Time",
    field: "dateStart",
  },
  {
    name: "dateEnd",
    align: "left",
    label: "Ending Date Time",
    field: "dateEnd",
  },
  {
    name: "schedule",
    align: "left",
    label: "",
    field: "schedule",
  },
];

function removeReservation(room_id) {
  Api.removeReservations(room_id)
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error.response);
    });
}

const rows = computed(() => {
  let data = props.roomsreservations.map((roomsreservation) => {
    return {
      id: roomsreservation.id,
      fullName: roomsreservation.attributes.fullName,
      room_code: roomsreservation.attributes.room_code,
      reservedFor: roomsreservation.attributes.reservedFor,
      eventType: roomsreservation.attributes.eventType,
      dateStart: roomsreservation.attributes.dateStart,
      dateEnd: roomsreservation.attributes.dateEnd,
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
