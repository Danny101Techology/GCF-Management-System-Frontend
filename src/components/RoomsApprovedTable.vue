<template>
  <q-table
    title="Approved Reservations"
    :rows="rows"
    :columns="columns"
    :filter="filter"
    row-key="id"
  >
    <template v-slot:top-right>
      <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
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
    sortable: true,
  },
  {
    name: "dateEnd",
    align: "left",
    label: "Ending Date Time",
    field: "dateEnd",
    sortable: true,
  },
  {
    name: "schedule",
    align: "left",
    label: "",
    field: "schedule",
  },
];


const approvedRows = ref([]);

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
      schedule: true,
    };
  });
  data = data.concat(
    approvedRows.value.map((reservation) => {
      return {
        id: reservation.id,
        fullName: reservation.attributes.fullName,
        room_code: reservation.attributes.room_code,
        reservedFor: reservation.attributes.reservedFor,
        eventType: reservation.attributes.eventType,
        dateStart: reservation.attributes.dateStart,
        dateEnd: reservation.attributes.dateEnd,
        schedule: false,
      };
    })
  );
  console.log(data);
  return data;
});


onMounted(() => {
  console.log("RoomsApprovedTable.vue have been mounted!");
  console.log(props.approvedRows);
});
</script>
