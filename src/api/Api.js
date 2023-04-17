import axios from "axios";
import store from "@/store/index.js";

axios.defaults.baseURL = process.env.VUE_APP_API_URI;

const login = function (email, password) {
  return axios.post(`api/auth/local`, {
    identifier: email,
    password: password,
  });
};

const getAllRooms = function () {
  console.log("token", store.state.token);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.get(`api/rooms`);
};

const getRoomById = function (id) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.get(`api/rooms/${id}?populate=images`);
};

const getAllEquipmentsReservations = function () {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.get(`api/equipment-reservations`);
};

const getAllEquipmentApproved = function () {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.get(`api/equipment-approveds`);
};

const getAllRoomsReservations = function () {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.get(`api/room-reservations`);
};

const getAllRoomsApproved = function () {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.get(`api/room-approveds`);
};

const getAllEquipments = function () {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.get(`api/equipments`);
};

const getEquipmentById = function (id) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.get(`api/equipments/${id}?populate=images`);
};

const getAllEquipmentStatus = function () {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.get(`api/equipment-statuses`);
};

const onFileAdded = async (file) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  await axios.post(`/api/equipment-reservations`, {
    file: file,
    upload: true,
  });
};
const getAllReservedFors = function () {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.get(`api/reserved-fors`);
};

const getAllEventTypes = function () {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.get(`api/event-types`);
};

const removeReservations = function (room_id) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.delete(`api/room-reservations/${room_id}`);
};

const createRoomsReservations = function (payload) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.post(`api/room-reservations`, payload);
};

const moveReservationToApproved = async function (room_id) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  await approveReservations(room_id);
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
