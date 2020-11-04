<template lang="pug">
  div
    router-link(
      :to="{name:'edit-user',params:{userId:userId}}"
    ) Edit

    button(v-on:click="removeUser") Delete
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class UserActions extends Vue {
  @Prop(Number) userId

  // this thing not working as expected. Shoudl assigment be moved to created func?
  editPath = {
    name: 'edit-user',
    params: {
      userId: this.userId,
    },
  }

  removeUser() {
    this.$store.commit('removeUser', this.userId);
  }
}
</script>
