import axios from "axios";
import store from "@/store/index.js";

axios.defaults.baseURL = process.env.VUE_APP_API_URI;

// interceptor to add Auth token to request config
axios.interceptors.request.use((req) => {
  // do not add Auth to api/auth/local
  if (req.url == `api/auth/local`) return req;

  // add Auth bearer token from state
  req.headers["Authorization"] = `Bearer ${store.state.token}`;
  return req;
});

// login api call
const login = function (email, password) {
  return axios.post(`api/auth/local`, {
    identifier: email,
    password: password,
  });
};

const getAllRooms = function () {
  return axios.get(`api/rooms`);
};

const getRoomById = function (id) {
  return axios.get(`api/rooms/${id}?populate=images`);
};

const getAllEquipmentsReservations = function () {
  return axios.get(`api/equipment-reservations`);
};

const getAllEquipmentApproved = function () {
  return axios.get(`api/equipment-approveds`);
};

const getAllRoomsReservations = function () {
  return axios.get(`api/room-reservations`);
};

const getAllRoomsApproved = function () {
  return axios.get(`api/room-approveds`);
};

const getAllEquipments = function () {
  return axios.get(`api/equipments`);
};

const getEquipmentById = function (id) {
  return axios.get(`api/equipments/${id}?populate=images`);
};

const getAllEquipmentStatus = function () {
  return axios.get(`api/equipment-statuses`);
};

const onFileAdded = function (file) {
  return axios.post(`/api/equipment-reservations`, {
    file: file,
    upload: true,
  });
};
const getAllReservedFors = function () {
  return axios.get(`api/reserved-fors`);
};

const getAllEventTypes = function () {
  return axios.get(`api/event-types`);
};

const removeReservations = function (room_id) {
  return axios.delete(`api/room-reservations/${room_id}`);
};

const createRoomsReservations = function (payload) {
  return axios.post(`api/room-reservations`, payload);
};

const moveReservationToApproved = async function (room_id) {
  return axios.post(`api/room-approveds/${room_id}`);
};

export default {
  login,
  getAllRooms,
  getRoomById,
  getAllRoomsReservations,
  getAllEquipmentsReservations,
  getAllEquipmentApproved,
  getAllEquipmentStatus,
  getAllEquipments,
  getEquipmentById,
  onFileAdded,
  getAllReservedFors,
  getAllRoomsApproved,
  getAllEventTypes,
  removeReservations,
  createRoomsReservations,
  moveReservationToApproved,
};
