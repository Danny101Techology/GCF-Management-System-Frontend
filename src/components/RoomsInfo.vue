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
        <div>
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
            <template v-for="img in images">
              <q-carousel-slide
                :name="img.name"
                :img-src="img.url"
              />
            </template>
          </q-carousel>
        </div>
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
