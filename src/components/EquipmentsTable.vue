<template>
  <q-table
    title="Equipments"
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
        <router-link
          style="text-decoration: none; color: inherit"
          :to="{ name: 'equipment-view', params: { equipment: props.row.id } }"
        >
          <q-btn size="sm" color="green" icon="add" round dense />
        </router-link>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
const props = defineProps({
  equipments: Array,
});
const filter = ref("");
const columns = [
  {
    name: "Equipment",
    align: "left",
    label: "Equipments",
    field: "equipments",
    sortable: true,
  },
  {
    name: "EquipmentSubType",
    align: "left",
    label: "Equipment SubType",
    field: "equipment_subtype",
    sortable: true,
  },
  {
    name: "EquipmentType",
    align: "left",
    label: "Equipment Type",
    field: "equipment_type",
    sortable: true,
  },
  {
    name: "schedule",
    align: "",
    label: "",
    field: "schedule",
  },
];
const rows = computed(() => {
  let data = props.equipments.map((equipment) => {
    return {
      id: equipment.id,
      equipments: equipment.attributes.equipments,
      equipment_type: equipment.attributes.equipment_type,
      equipment_subtype: equipment.attributes.equipment_subtype,
    };
  });
  console.log(data);
  return data;
});
onMounted(() => {
  console.log("Equipments.vue have been mounted!");
  console.log(props.equipments);
});
</script>
