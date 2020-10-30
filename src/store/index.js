import Vue from 'vue';
import vuex from 'vuex';

Vue.use(vuex);

const store = new vuex.Store({
  state: {
    users: {
    },
  },

  getters: {
    // Didn't work as expected. Stays 0 even if list has items
    usersCount: (state) => Object.keys(state.users).length,

    nextId: (state) => Math.max(Object.keys(state.users).map((s) => parseInt(s, 10))) + 1,
  },

  mutations: {
    addUser(state, user) {
      const nextId = Object.keys(state.users)
        .map((s) => parseInt(s, 10)).reduce((a, b) => Math.max(a, b), 0) + 1;

      state.users[nextId] = {
        name: user.name,
        age: user.age,
        icecream: user.icecream,
        id: nextId,
      };
    },

    updateUser(state, user) {
      state.users[user.id].name = user.name;
      state.users[user.id].age = user.age;
      state.users[user.id].icecream = user.icecream;
    },

    removeUser(state, userId) {
      Vue.delete(state.users, userId);
    },
  },
});

export default store;
