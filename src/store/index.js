import { createStore } from "vuex";
import Api from "@/api/Api";

export default createStore({
  state: {
    lazyRules: [],
    allLazyRulesTriggered: false,
    user: localStorage.getItem("user"),
    isAuthenticated: localStorage.getItem("isAuthenticated"),
    token: localStorage.getItem("token"),
  },
  getters: {},
  mutations: {
    initializeState(state) {
      state.user = localStorage.getItem("user");
      state.isAuthenticated = localStorage.getItem("isAuthenticated");
      state.token = localStorage.getItem("token");
    },
    resetState(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.setItem("isAuthenticated", false);
      localStorage.setItem("token", null);
      localStorage.setItem("user", null);
    },
    loginSuccess(state, payload) {
      state.isAuthenticated = true;
      state.token = payload.token;
      state.user = payload.user;
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", payload.user);
    },
    loginFailure(state) {
      state.isAuthenticated = false;
    },
    setLazyRules(state, lazyRules) {
      console.log('Setting lazy rules:', lazyRules);
      state.lazyRules = lazyRules;
    },
    setAllLazyRulesTriggered(state, allLazyRulesTriggered) {
      console.log('Setting allLazyRulesTriggered:', allLazyRulesTriggered);
      state.allLazyRulesTriggered = allLazyRulesTriggered;
    },
  },
  actions: {
    login({ commit }, { email, password }) {
      let result = Api.login(email, password)
        .then((response) => {
          let jwt = response.data.jwt;
          let user = response.data.user;
          console.log(jwt);

          commit("loginSuccess", {
            user: user,
            token: jwt,
          });
          return true;
        })
        .catch((error) => {
          console.log(error.response);
          commit("loginFailure");
          return false;
        });
    },
    logout({ commit }) {
      commit("resetState");
    },
    clearState({ commit }) {
      commit("resetState");
    },
  },
  modules: {},
});
