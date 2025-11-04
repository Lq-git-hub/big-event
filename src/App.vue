<script setup>
// import { useRoute } from 'vue-router'
// import {useRouter} from 'vue-router'
import { useUserstore } from './stores/model/user'
const userStore = useUserstore()

// const router = useRouter()
// const route = useRoute()
// const list = ()=>{
//   router.push('/list')
// }

</script>

<template>
<div>
  <br>
  <router-view></router-view>
  <br>
  <br>
  <br>
  <br>
  我是App{{ userStore.token }}
  <el-button @click="userStore.setToken('112233445566')">登录</el-button>
  <el-button @click="userStore.removeToken">退出</el-button>
</div>

</template>

<style scoped></style>
