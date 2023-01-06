import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_URI;
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.VUE_APP_API_TOKEN}`;

const getAllRooms = function() {
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
  return axios.delete(`api/rooms-reservation`);
}

export default {
  getAllRooms,
  getRoomById,
  getAllRoomsReservations,
  getAllEquipments,
  getEquipmentById,
  getAllReservedFors,
  getAllEventTypes
}
