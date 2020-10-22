import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

const store = new vuex.Store({
  state: {
    users: {
      1: {
        id: 1,
        name: 'Test',
        age: '30'
      }
    }
  },

  getters: {
    // Didn't work as expected. Stays 0 even if list has items
    usersCount: state => {
      return Object.keys(state.users).length
    },

    nextId: state => {
      return Math.max(Object.keys(state.users).map((s) => parseInt(s))) + 1
    }
  },

  mutations: {
    addUser: function (state, user) {
      const nextId = Object.keys(state.users).map((s) => parseInt(s)).reduce((a, b) => Math.max(a, b)) + 1
      state.users[nextId] = {
        name: user.name,
        age: user.age,
        id: nextId
      }
    },

    updateUser: function (state, user) {
      state.users[user.id].name = user.name
      state.users[user.id].age = user.age
    },

    removeUser: function (state, userId) {
      delete state.users[userId]
    }
  }
})

export default store
