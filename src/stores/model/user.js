import {defineStore} from 'pinia'
import { ref } from 'vue'

//用户模块 token setToken removeToken
export const useUserstore = defineStore('big-user',()=>{
  const token = ref('')
  const setToken = (newToken)=>{
    token.value = newToken
    console.log(token.value)
  }
  const removeToken = ()=>{
      token.value = ''
  }
  return {
    token,
    setToken,
    removeToken
  }
},{persist:true})
