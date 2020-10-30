<template lang="pug">
  div
    form
      label Name
      input(v-model="formData.name")
      hr
      label Age
      input(v-model.number="formData.age" type="number")
      hr
      label Loves Icecream
      input(type="checkbox", v-model="formData.icecream")
      div(v-show="needSave")
        hr
        button(v-on:click="store") Save
</template>

<script>
export default {
  name: 'Adduser',
  data() {
    const formData = {
      name: '',
      age: '',
      icecream: false,
    };

    if (this.$route.params.userId) {
      const { userId } = this.$route.params;
      if (userId in this.$store.state.users) {
        this.loadedUser = this.$store.state.users[userId];
        formData.name = this.loadedUser.name;
        formData.age = this.loadedUser.age;
        formData.icecream = this.loadedUser.icecream;
        formData.id = userId;
      } else {
        // Here should be error handler
        // eslint-disable-next-line no-console
        console.error('No user');
      }
    }

    return {
      formData,
    };
  },

  computed: {
    needSave() {
      const notEmpty = !!this.formData.name.length && !!this.formData.age;

      const editMode = 'loadedUser' in this;
      const addMode = !editMode;

      let result = false;
      if (addMode) {
        result = notEmpty;
      }

      if (editMode) {
        const nameHasChanges = this.formData.name !== this.loadedUser.name;
        const ageHasChanges = this.formData.age !== this.loadedUser.age;
        const icecreamHasChanges = this.formData.icecream !== this.loadedUser.icecream;
        const hasChanges = nameHasChanges || ageHasChanges || icecreamHasChanges;
        result = editMode && notEmpty && hasChanges;
      }

      return result;
    },
  },

  methods: {
    store() {
      if (this.loadedUser) {
        this.$store.commit('updateUser', this.formData);
      } else {
        this.$store.commit('addUser', this.formData);
      }
      this.$router.push({ name: 'list' });
    },
  },
};
</script>
