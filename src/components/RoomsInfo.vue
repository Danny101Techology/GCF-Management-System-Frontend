<template>

<<<<<<< HEAD
=======
<<<<<<< HEAD
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section>
          <q-item-label>{{site}} > {{name}}</q-item-label>
          <q-item-label caption>Capacity: {{capacity}} pax</q-item-label>
        </q-item-section>
      </q-item>
  
      <q-separator />
  
      <q-card-section vertical>
        <q-card-section>
  
          <!-- replace this part with carousel -->
          <template v-for="img in images">
            <img :src="img" width="200" />
          </template>
          <!-- replace this part with carousel -->
          
        </q-card-section>
  
        <q-card-actions>
          <q-btn flat round icon="event" />
          <q-btn flat color="primary">
            Reserve
          </q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  const props = defineProps({
    room: Object
  });
  const name = computed(() => props.room.name);
  const capacity = computed(() => props.room.capacity);
  const site = computed(() => props.room.site);
  const available = computed(() => props.room.available);
  const images = computed(() => props.room.images);
  onMounted(() => {
    console.log("RoomsDialog.vue have been mounted!");
    console.log(props.room)
  });
  </script>
=======
>>>>>>> 76bdf4be165245a6dc707dfe7b2823f68ad95c2c
  <q-card class="my-card" flat bordered>
    <q-item>
      <q-item-section>
        <q-item-label>{{site}} > {{name}}</q-item-label>
        <q-item-label caption>Capacity: {{capacity}} pax</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section vertical>
      <q-card-section>

        <!-- replace this part with carousel -->
        <template v-for="img in images">
          <img :src="img" width="200" />
        </template>
        <!-- replace this part with carousel -->
        
      </q-card-section>

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat color="primary">
          Reserve
        </q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  room: Object
});

const name = computed(() => props.room.name);
const capacity = computed(() => props.room.capacity);
const site = computed(() => props.room.site);
const available = computed(() => props.room.available);
const images = computed(() => props.room.images);

onMounted(() => {
  console.log("RoomsDialog.vue have been mounted!");
  console.log(props.room)
});
</script>
<<<<<<< HEAD
=======
>>>>>>> 5c8d0ed360831d2770ec46a3a4ae4bdbf24a9cef
>>>>>>> 76bdf4be165245a6dc707dfe7b2823f68ad95c2c
