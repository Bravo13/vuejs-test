<template lang="pug">
  div
    form
      label Name
      input(v-model="formData.name")
      hr
      label Age
      input(v-model="formData.age")
      div(v-show="needSave")
        hr
        button(v-on:click="store") Save
</template>

<script>
export default {
  name: 'Adduser',
  data: () => {
    let formData = {
      name: '',
      age: ''
    }

    return {
      formData: formData
    }
  },

  computed: {
    needSave: function () {
      return !!this.formData.name.length || !!this.formData.age.length
    }
  },

  methods: {
    store: function (event) {
      if (this.formData.id) {
        this.$store.commit('updateUser', this.formData)
      } else {
        this.$store.commit('addUser', this.formData)
      }
      this.$router.push({name: 'list'})
    }
  }
}
</script>
