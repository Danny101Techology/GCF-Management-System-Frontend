<template>
  <q-table
    title="Approved Reservations"
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
  </q-table>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, defineProps, computed, onMounted } from "vue";

import Api from "@/api/Api";

const props = defineProps({
  roomsapproved: Array,
});
console.log (props.roomsapproved);

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
    format: (val) => {
      if (!val) return "N/A";
      const date = new Date(val);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      return date.toLocaleString("en-US", options);
    },
  },
  {
    name: "dateEnd",
    align: "left",
    label: "Ending Date Time",
    field: "dateEnd",
    sortable: true,
    format: (val) => {
      if (!val) return "N/A";
      const date = new Date(val);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      return date.toLocaleString("en-US", options);
    },
  },
];

const rows = ref(props.approvedRooms);


onMounted(() => {
  console.log("RoomsApprovedTable.vue has been mounted!");
  console.log(props.roomsapproved);
});
</script>
