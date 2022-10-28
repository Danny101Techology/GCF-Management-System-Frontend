<template>
  <div class="q-pa-md">
    <q-table
      ref="tableRef"
      title="Rooms"
      :rows="rows"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      :loading="loading"
      :filter="filter"
      binary-state-sort
      @request="onRequest"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      /expand
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="green"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
            <q-btn size="sm" color="green" round dense @click="dialog = true" icon="event"/>
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              This is expand slot for row above: {{ props.row.name }}.
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
                  <q-carousel-slide
                    :name="2"
                    img-src="https://cdn.quasar.dev/img/parallax1.jpg"
                  />
                  <q-carousel-slide
                    :name="3"
                    img-src="https://cdn.quasar.dev/img/parallax2.jpg"
                  />
                  <q-carousel-slide
                    :name="4"
                    img-src="https://cdn.quasar.dev/img/quasar.jpg"
                  />
                </q-carousel>
              </div>


              <div class="q-pa-md">
                <q-btn color="teal" label="Reserve" @click="dialog = true" />

                <q-dialog v-model="dialog">
                  <q-layout
                    view="lhh LpR lff"
                    container
                    style="height: 500px"
                    class="bg-grey-3"
                  >
                    <!--RESERVATION TAB-->
                    <q-page-container>
                      <q-page class="pa-md">
                        <q-tabs v-model="tab" class="bg-teal text-yellow">
                          <q-route-tab to="/calendar" icon="event" exact />
                          <q-route-tab name="alarms" icon="alarm" exact />
                          <q-route-tab name="movies" icon="movie" exact />
                        </q-tabs>
                      </q-page>

                      <q-page-scroller position="bottom">
                        <q-btn fab icon="keyboard_arrow_up" color="red" />
                      </q-page-scroller>
                    </q-page-container>
                  </q-layout>
                </q-dialog>

              </div>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from "axios";

import Calendar from '@/components/Calendar.vue'

const columns = [
  {
    name: "desc",
    required: true,
    label: "Sort A-Z",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "Area",
    align: "left",
    label: "Site",
    field: "RoomCode",
    sortable: true,
  },
  { name: "Room Code List", align:"left", label: "Code", field: "RoomName", sortable: true },
  { name: "Room Name List", align:"left",  label: "Name", field: "Capacity", sortable: true },
  { name: "Size", align:"left", label: "Capacity", field: "Size", sortable: true },

  
];

const originalRows = [
  {
    id: 1,
    name: "Basement 1",
    RoomCode: "BB1-01",
    RoomName: "Car Parking",
    Size: "30 Cars",
  },
  {
    id: 2,
    name: "Basement 2",
    RoomCode: "BB2-01",
    RoomName: "Car Parking",
    Size: "40 Cars",
  },
  {
    id: 3,
    name: "Ground Floor A",
    RoomCode: "A102",
    RoomName: "Fellowship Hall 1",
    Size: 40,
  },
  {
    id: 4,
    name: "Ground Floor A",
    RoomCode: "A107a",
    RoomName: "Fellowship Hall 6",
    Size: 50,
  },
  {
    id: 5,
    name: "Ground Floor A",
    RoomCode: "A103",
    RoomName: "Fellowship Hall 2",
    Size: 40,
  },
  {
    id: 6,
    name: "Ground Floor A",
    RoomCode: "A104a",
    RoomName: "Fellowship Hall 3",
    Size: 35,
  },
  {
    id: 7,
    name: "Second Floor A",
    RoomCode: "A209",
    RoomName: "Auditorium A",
    Size: 650,
  },
  {
    id: 8,
    name: "Second Floor A",
    RoomCode: "A201",
    RoomName: "Production Room 2",
    Size: 35,
  },
  {
    id: 9,
    name: "Second Floor A",
    RoomCode: "A201a",
    RoomName: "Recording Booth",
    Size: 10,
  },
  {
    id: 10,
    name: "Second Floor A",
    RoomCode: "A208",
    RoomName: "Production Room 3",
    Size: 30,
  },
  {
    id: 11,
    name: "Second Floor A",
    RoomCode: "A300",
    RoomName: "Auditorium A Balcony",
    Size: 325,
  },
  {
    id: 12,
    name: "Third Floor A",
    RoomCode: "A312",
    RoomName: "AHU Room",
    Size: 20,
  },
  {
    id: 13,
    name: "Third Floor A",
    RoomCode: "A311",
    RoomName: "Discipleship Room 6",
    Size: 20,
  },
  {
    id: 14,
    name: "Third Floor A",
    RoomCode: "A306",
    RoomName: "Discipleship Room 3",
    Size: 12,
  },
  {
    id: 15,
    name: "Third Floor A",
    RoomCode: "A304",
    RoomName: "Discipleship Room 1",
    Size: 15,
  },
  {
    id: 16,
    name: "Third Floor A",
    RoomCode: "A303",
    RoomName: "Discipleship Center",
    Size: 30,
  },
  {
    id: 17,
    name: "Second Floor B",
    RoomCode: "B201",
    RoomName: "Auditorium B",
    Size: 940,
  },
  {
    id: 18,
    name: "Second Floor B",
    RoomCode: "B202",
    RoomName: "Nursing Mothers & Toddler's Room",
    Size: 30,
  },
  {
    id: 19,
    name: "Balcony",
    RoomCode: "B2B01",
    RoomName: "Auditorium B Balcony",
    Size: 450,
  },
  {
    id: 20,
    name: "Ground Floor B",
    RoomCode: "B100",
    RoomName: "Main Lobby",
    Size: 350,
  },
  {
    id: 21,
    name: "Ground Floor B",
    RoomCode: "B123",
    RoomName: "Women's Center",
    Size: 20,
  },
  {
    id: 22,
    name: "Ground Floor B",
    RoomCode: "B122",
    RoomName: "Single's Room",
    Size: 20,
  },
  {
    id: 23,
    name: "Ground Floor B",
    RoomCode: "B121",
    RoomName: "Senior's Room",
    Size: 20,
  },
  {
    id: 24,
    name: "Ground Floor B",
    RoomCode: "B119",
    RoomName: "Prayer Chapel",
    Size: 120,
  },
  {
    id: 25,
    name: "Mezzanine",
    RoomCode: "BM08",
    RoomName: "Meeting Room 5",
    Size: 40,
  },
  {
    id: 26,
    name: "Mezzanine",
    RoomCode: "BM09",
    RoomName: "Clinic",
    Size: 3,
  },
  {
    id: 27,
    name: "Mezzanine",
    RoomCode: "BM06",
    RoomName: "Production Room 1",
    Size: 70,
  },
  {
    id: 28,
    name: "Mezzanine",
    RoomCode: "BM07",
    RoomName: "Meeting Room 4",
    Size: 50,
  },
  {
    id: 29,
    name: "Mezzanine",
    RoomCode: "BM04",
    RoomName: "Meeting Room 3",
    Size: 18,
  },
  {
    id: 30,
    name: "Mezzanine",
    RoomCode: "BM03",
    RoomName: "Meeting Room 2",
    Size: 18,
  },
  {
    id: 31,
    name: "Mezzanine",
    RoomCode: "BM02",
    RoomName: "Meeting Room 1",
    Size: 18,
  },
  {
    id: 32,
    name: "Sixth Floor",
    RoomCode: "B601",
    RoomName: "Youth Center Hall",
    Size: 50,
  },
  {
    id: 33,
    name: "Sixth Floor",
    RoomCode: "B601d",
    RoomName: "Youth Center Discipleship Room",
    Size: 12,
  },
  {
    id: 34,
    name: "Sixth Floor",
    RoomCode: "B601c",
    RoomName: "Youth Center Meeting Room",
    Size: 20,
  },
  {
    id: 35,
    name: "Gingerbread-3",
    RoomCode: "B2B01",
    RoomName: "Auditorium B Balcony",
    Size: 24,
  },
  {
    id: 36,
    name: "Jelly bean-3",
    RoomCode: "B2B01",
    RoomName: "Auditorium B Balcony",
    Size: 24,
  },
  {
    id: 37,
    name: "Lollipop-3",
    RoomCode: "B2B01",
    RoomName: "Auditorium B Balcony",
    Size: 24,
  },
  {
    id: 38,
    name: "Honeycomb-3",
    RoomCode: "B2B01",
    RoomName: "Auditorium B Balcony",
    Size: 24,
  },
  {
    id: 39,
    name: "Donut-3",
    RoomCode: "B2B01",
    RoomName: "Auditorium B Balcony",
    Size: 24,
  },
  {
    id: 40,
    name: "KitKat-3",
    RoomCode: "B2B01",
    RoomName: "Auditorium B Balcony",
    Size: 24,
  },
];
export default {
  components: {Calendar},
  setup() {
    const tableRef = ref();
    const rows = ref([]);
    const filter = ref("");
    const loading = ref(false);
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 3,
      rowsNumber: 10,
    });
    function fetchFromServer(startRow, count, filter, sortBy, descending) {
      const data = filter
        ? originalRows.filter((row) => row.name.includes(filter))
        : originalRows.slice();
      // handle sortBy
      if (sortBy) {
        const sortFn =
          sortBy === "desc"
            ? descending
              ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
              : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
            : descending
            ? (a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy])
            : (a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
        data.sort(sortFn);
      }
      return data.slice(startRow, startRow + count);
    }
    // emulate 'SELECT count(*) FROM ...WHERE...'
    function getRowsNumberCount(filter) {
      if (!filter) {
        return originalRows.length;
      }
      let count = 0;
      originalRows.forEach((treat) => {
        if (treat.name.includes(filter)) {
          ++count;
        }
      });
      return count;
    }
    function onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;
      loading.value = true;
      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        pagination.value.rowsNumber = getRowsNumberCount(filter);
        // get all rows if "All" (0) is selected
        const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;
        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage;
        // fetch data from "server"
        const returnedData = fetchFromServer(
          startRow,
          fetchCount,
          filter,
          sortBy,
          descending
        );
        // clear out existing data and add new
        rows.value.splice(0, rows.value.length, ...returnedData);
        // don't forget to update local pagination object
        pagination.value.page = page;
        pagination.value.rowsPerPage = rowsPerPage;
        pagination.value.sortBy = sortBy;
        pagination.value.descending = descending;
        // ...and turn of loading indicator
        loading.value = false;
      }, 1500);
    }
    onMounted(() => {
      // get initial data from server (1st page)
      tableRef.value.requestServerInteraction();
    });
    return {
      tableRef,
      filter,
      loading,
      pagination,
      columns,
      rows,
      dialog: ref(false),
      drawerLeft: ref(false),
      drawerRight: ref(true),
      //Reserve tabs
      tab: ref("mails"),
      //Carousel
      slide: ref(1),
      autoplay: ref(true),

      onRequest,
    };
  },
};
</script>
