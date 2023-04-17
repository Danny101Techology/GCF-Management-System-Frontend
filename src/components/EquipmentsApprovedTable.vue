<template>
  <div>
    <q-table
      title="Equipments Approved"
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
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";

import Api from "@/api/Api";

const props = defineProps({
  equipmentsapproveds: Array,
});

const filter = ref("");

const columns = [
  {
    name: "equipmentName",
    align: "left",
    label: "Equipment Name",
    field: "equipmentName",
    sortable: true,
  },
  {
    name: "equipment_type",
    align: "left",
    label: "Equipment Type",
    field: "equipment_type",
    sortable: true,
  },
  {
    name: "equipment_subtype",
    align: "left",
    label: "Equipment Subtype",
    field: "equipment_subtype",
    sortable: true,
  },
  {
    name: "date_borrowed",
    align: "left",
    label: "Date Borrowed",
    field: "date_borrowed",
    sortable: true,
    format: (val) => {
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
    name: "date_returned",
    align: "left",
    label: "Date Returned",
    field: "date_returned",
    sortable: true,
    format: (val) => {
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

const rows = computed(() => {
  let data = props.equipmentsapproveds.map((equipmentsapproveds) => {
    const date_borrowed = equipmentsapproveds.attributes.dateStart
      ? new Date(equipmentsapproveds.attributes.dateStart).toLocaleString()
      : null;
    const date_returned = equipmentsapproveds.attributes.dateEnd
      ? new Date(equipmentsapproveds.attributes.dateEnd).toLocaleString()
      : null;
    return {
      id: equipmentsapproveds.id,
      equipmentName: equipmentsapproveds.equipmentName,
      equipment_type: equipmentsapproveds.attributes.equipment_type,
      equipment_subtype: equipmentsapproveds.attributes.equipment_subtype,
      date_borrowed: date_borrowed,
      date_returned: date_returned,
    };
  });
  console.log(data);
  return data;
});

onMounted(() => {
  console.log("EquipmentsApprovedTable.vue have been mounted!");
  console.log(props.equipmentsapproveds);
});
</script>
