// store/modules/booking.js
export default {
    namespaced: true,
    state: {
      fullName: '',
      email: '',
      dateStart: '',
      dateEnd: '',
      eventType: '',
      reservedFor: ''
    },
    mutations: {
      setFullName(state, value) {
        state.fullName = value
      },
      setEmail(state, value) {
        state.email = value
      },
      setDateStart(state, value) {
        state.dateStart = value
      },
      setDateEnd(state, value) {
        state.dateEnd = value
      },
      setEventType(state, value) {
        state.eventType = value
      },
      setReservedFor(state, value) {
        state.reservedFor = value
      }
    }
  }
  