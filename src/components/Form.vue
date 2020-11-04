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
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Form extends Vue {
  data() {
    const formData = {
      name: '',
      age: '',
      icecream: false,
    };

    if (this.userId) {
      if (this.userId in this.$store.state.users) {
        this.loadedUser = this.$store.state.users[this.userId];
        formData.name = this.loadedUser.name;
        formData.age = this.loadedUser.age;
        formData.icecream = this.loadedUser.icecream;
        formData.id = this.userId;
      } else {
        // Here should be error handler
        // eslint-disable-next-line no-console
        console.error('No user');
      }
    }

    return {
      formData,
    };
  }

  @Prop(Number) userId;

  get needSave() {
    const notEmpty = !!this.formData.name.length && !!this.formData.age;

    let result = false;
    if (!this.userId) {
      result = notEmpty;
    }

    if (this.userId) {
      const nameHasChanges = this.formData.name !== this.loadedUser.name;
      const ageHasChanges = this.formData.age !== this.loadedUser.age;
      const icecreamHasChanges = this.formData.icecream !== this.loadedUser.icecream;
      const hasChanges = nameHasChanges || ageHasChanges || icecreamHasChanges;
      result = this.userId && notEmpty && hasChanges;
    }

    return result;
  }

  store() {
    if (this.loadedUser) {
      this.$store.commit('updateUser', this.formData);
    } else {
      this.$store.commit('addUser', this.formData);
    }
    this.$router.push({ name: 'list' });
  }
}
</script>
