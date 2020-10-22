<!--
  router-link "to" can be name or should be path only?
-->
<template lang="pug">
  div#app
    router-link(
      v-for="item in menu"
      v-bind:to="item.path"
      v-bind:key="item.name"
    ) {{ item.title }}
    router-view
</template>

<script>

import router from '@/router'
import List from '@/components/List'
import Form from '@/components/Form'
import Stat from '@/components/Stat'

const components = [ List, Form, Stat ]

const menu = components.map((module) => {
  return {
    component: module,
    name: module.name.toLowerCase(),
    path: module.isIndex ? '/' : '/' + module.name.toLowerCase().replace(/\s+|\//, '-'),
    title: module.name
  }
})

menu.forEach((item) => router.addRoutes([{
  component: item.component,
  path: item.path,
  name: item.name
}]))

router.addRoutes([{
  component: Form,
  name: 'edit-user',
  path: '/edit/:userId'
}])

export default {
  name: 'App',
  data: () => {
    return {
      menu: menu
    }
  }
}
</script>
