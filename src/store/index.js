import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

const store = new vuex.Store({
  state: {
    users: {
    }
  },

  getters: {
    // Didn't work as expected. Stays 0 even if list has items
    usersCount: state => {
      return Object.keys(state.users).length
    },

    nextId: state => {
      return Math.max(Object.keys(state.users)) + 1
    }
  },

  mutations: {
    addUser: function (state, user) {
      const nextId = Math.max(Object.keys(state.users)) + 1
      state.users[nextId] = {
        name: user.name,
        age: user.age
      }
    },

    updateUser: function (state, user) {

    },

    removeUser: function (state, user) {

    }
  }
})

export default store
