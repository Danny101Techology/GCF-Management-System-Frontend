<template>
  <div class="q-pa-md">
    <q-btn color="teal" label="Reserve" @click="dialog = true" />

    <q-dialog v-model="dialog">
      <q-layout view="lhh LpR lff" container style="height: 500px" class="bg-grey-3">
        <q-page-container>
          <q-page class="q-pa-md">
            <p v-for="n in 15" :key="n">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil
              praesentium molestias a adipisci, dolore vitae odit, quidem consequatur
              optio voluptates asperiores pariatur eos numquam rerum delectus commodi
              perferendis voluptate?
            </p>
          </q-page>

          <q-page-scroller position="bottom">
            <q-btn fab icon="keyboard_arrow_up" color="red" />
          </q-page-scroller>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </div>
</template>
