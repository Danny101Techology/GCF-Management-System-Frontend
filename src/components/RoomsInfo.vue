<template>
  <div class="q-pa-md">
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section>
          <q-item-label>{{ site }} > {{ name }}</q-item-label>
          <q-item-label caption>Capacity: {{ capacity }} pax</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section vertical>
        <q-card-section>
          <!-- replace this part with carousel -->

          <!-- <template v-for="img in images"> -->
          <div class="q-pa-md">
            <q-carousel
              animated
              v-model="slide"
              navigation
              infinite
              :autoplay="autoplay"
              arrows
              transition-prev="slide-right"
              transition-next="slide-left"
              @mouseenter="autoplay = false"
              @mouseleave="autoplay = true"
            >
              <q-carousel-slide
                :name="1"
                img-src="https://cdn.quasar.dev/img/mountains.jpg"
              />
              <q-carousel-slide :name="2" img :src="img" />
              <q-carousel-slide
                :name="3"
                img-src="https://cdn.quasar.dev/img/parallax2.jpg"
              />
              <q-carousel-slide
                :name="4"
                img-src="https://cdn.quasar.dev/img/parallax1.jpg"
              />
            </q-carousel>
          </div>
          <!-- <img :src="img" width="200" /> -->
          <!-- </template> -->
          <!-- replace this part with carousel -->
        </q-card-section>

        <q-card-actions>
          <q-btn flat icon="event" color="primary" @click="reserve = true">
            Reserve
          </q-btn>
        </q-card-actions>

        <q-dialog v-model="reserve">
          <q-card>
            <q-card-section>
              <div class="text-h6">Please confirm your reservation</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Perferendis laudantium minus earum totam modi laborum illo,
              corporis fuga saepe animi aliquam ea enim assumenda ut nulla natus
              aperiam quis. Iste.
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn
                flat
                label="Confirm Reservation"
                @click="secondDialog = true"
              />
              <q-btn flat label="Close" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card-section>



    </q-card>
  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 950px
</style>

<script setup>
import { ref, computed, onMounted } from "vue";

const slide = ref(1);
const autoplay = ref(true);
const image = ref();

const reserve = ref(false);

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
