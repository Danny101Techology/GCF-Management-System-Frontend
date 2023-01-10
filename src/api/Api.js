import axios from "axios";
import store from "@/store/index.js"

axios.defaults.baseURL = process.env.VUE_APP_API_URI;

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
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.get(`api/rooms/${id}?populate=images`);
}

const getAllRoomsReservations = function() {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.get(`api/room-reservations`);
}

const getAllEquipments = function() {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.get(`api/equipments`);
}

const getEquipmentById = function(id) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.get(`api/equipments/${id}?populate=images`);
}

const getAllReservedFors = function() {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.get(`api/reserved-fors`);
}

const getAllEventTypes = function() {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.get(`api/event-types`);
}

const removeReservations = function(room_id) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.state.token}`;
  return axios.delete(`api/room-reservations/${room_id}`);
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
