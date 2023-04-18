<template>
  <q-table
    title="Rooms"
    :rows="rows"
    :columns="columns"
    :filter="filter"
    row-key="id"
    :loading="isLoading"
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
        <router-link
          style="text-decoration: none; color: inherit"
          :to="{ name: 'room-view', params: { room: props.row.id } }"
        >
          <q-btn size="sm" color="green" icon="add" round dense />
        </router-link>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  rooms: Array,
  isLoading: Boolean
});
const filter = ref("");
const columns = [
  {
    name: "site",
    align: "left",
    label: "Site",
    field: "site",
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
    name: "Capacity",
    align: "left",
    label: "Capacity",
    field: "capacity",
    sortable: true,
  },
  {
    name: "Available",
    align: "left",
    label: "Availability",
    field: "available",
    sortable: true,
  },
  {
    name: "schedule",
    align: "left",
    label: "Book",
    field: "schedule",
  },
];

const rows = computed(() => {
  let data = props.rooms.map((room) => {
    return {
      id: room.id,
      room_code: room.attributes.room_code,
      available: room.attributes.available,
      capacity: room.attributes.capacity,
      site: room.attributes.site,
    };
  });
  return data;
});
</script>
