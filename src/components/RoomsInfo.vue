<template>
  <div class="q-pa-md">
    <div class="row items-start q-gutter-md">
      <q-responsive :ratio="1" class="my-card">
        <q-card class="my-card" flat bordered>
          <q-item>
            <q-item-section>
              <q-item-label>{{ site }} > {{ name }}</q-item-label>
              <q-item-label caption>Capacity: {{ capacity }} pax</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-responsive :ratio="16 / 8">
            <q-card-section vertical>
              <q-card-section>
                <!-- replace this part with carousel -->
                <template v-for="img in images">
                  <img:src="img" width="200" />
                </template>
                <!-- replace this part with carousel -->
              </q-card-section>

              <q-card-actions>
                <q-btn flat round icon="event" />
                <q-btn flat color="primary"> Reserve </q-btn>
              </q-card-actions>
            </q-card-section>
          </q-responsive>
        </q-card>
      </q-responsive>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px
</style>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  room: Object,
});

const name = computed(() => props.room.name);
const capacity = computed(() => props.room.capacity);
const site = computed(() => props.room.site);
const available = computed(() => props.room.available);
const images = computed(() => props.room.images);

onMounted(() => {
  console.log("RoomsDialog.vue have been mounted!");
  console.log(props.room);
});
</script>
