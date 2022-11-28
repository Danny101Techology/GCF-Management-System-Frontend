<template>
  <div class="col-9">
    <div class="q-pa-md">
      <div class="q-gutter-md row items-start">
        <q-date v-model="date" range />
      </div>
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-sm row">
        <q-input filled v-model="time" mask="time" :rules="['time']">
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time v-model="time">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          filled
          v-model="timeWithSeconds"
          mask="fulltime"
          :rules="['fulltime']"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time v-model="timeWithSeconds" with-seconds format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-select
          color="purple-12"
          v-model="model"
          :options="options"
          label="Type of Event"
        >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-select>
      </div>
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-select
          color="purple-12"
          v-model="model"
          :options="options"
          label="Reserved for"
        >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-select>
      </div>
    </div>
  </div>
</template>
