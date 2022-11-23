<template>
  <q-table
    title="Equipments"
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
    <template v-slot:body-cell-schedule dense>
      <q-tr>
        <q-td>
          <q-btn
            size="sm"
            color="green"
            round
            dense
            @click="props.expand = !props.expand"
            :icon="props.expand ? 'remove' : 'add'"
          />
          <q-btn size="sm" color="green" round dense icon="event" />
        </q-td>
      </q-tr>
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
];
const rows = computed(() => {
  let data = props.equipments.map((equipment) => {
    return {
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
