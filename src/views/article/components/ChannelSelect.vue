<script setup>
import {artGetChannelsService} from '@/api/article'
import {ref} from 'vue'

const ChannelList = ref([])
const getChannelList = async ()=>{
  const res = await artGetChannelsService()
  ChannelList.value = res.data.data
}
getChannelList()

defineProps({
  modelValue:{
    type:[Number,String]
  }
})
defineEmits(['update:modelValue'])
</script>

<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue',$event)"
    placeholder="请选择"
    style="width: 200px;padding-right:15px ;"
    clearable
  >
    <el-option v-for="Channel in ChannelList"
     :label="Channel.cate_name"
     :value="Channel.id"
      :key="Channel.id"/>
  </el-select>
</template>
