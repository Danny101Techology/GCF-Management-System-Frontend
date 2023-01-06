import axios from "axios";
import store from "@/store/index.js"

axios.defaults.baseURL = process.env.VUE_APP_API_URI;
// axios.defaults.headers.common[
//   "Authorization"
// ] = `Bearer ${process.env.VUE_APP_API_TOKEN}`;

const login = function(email, password) {
  return axios.post(`api/auth/local`, {
    identifier: email,
    password: password
  })
};

const getAllRooms = function() {
  console.log("token", store.state.token)
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.get(`api/rooms`);
}

const getRoomById = function(id) {
  return axios.get(`api/rooms/${id}?populate=images`);
}

const getAllRoomsReservations = function() {
  return axios.get(`api/room-reservations`);
}

const getAllEquipments = function() {
  return axios.get(`api/equipments`);
}

const getEquipmentById = function(id) {
  return axios.get(`api/equipments/${id}?populate=images`);
}

const getAllReservedFors = function() {
  return axios.get(`api/reserved-fors`);
}

const getAllEventTypes = function() {
  return axios.get(`api/event-types`);
}

const removeReservations = function() {
  return axios.delete(`api/rooms-reservation/${room_id}`);
}

export default {
  login,
  getAllRooms,
  getRoomById,
  getAllRoomsReservations,
  getAllEquipments,
  getEquipmentById,
  getAllReservedFors,
  getAllEventTypes,
  removeReservations
}
