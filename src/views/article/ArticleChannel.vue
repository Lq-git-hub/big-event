<script setup>
import pageContainer from '@/components/pageContainer.vue'  // 导入自定义组件
import {artGetChannelsService,artDelChannelsService} from '@/api/article'
import {ref} from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import addChannel from '@/views/article/components/addChannel.vue'

const dialog = ref()
const loading = ref('false')
const channelList = ref([])
const getChannelList = async ()=>{
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()


const onDelChannel =async (row) => {
  await artDelChannelsService(row.id)
  getChannelList()
}
const onEditChannel = (row) => {
  // console.log(row,$index)
  dialog.value.open(row)
}
const onAddChannel = ()=>{
  dialog.value.open({})
}

const onSuccess = ()=>{
  getChannelList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel">添加分类</el-button>
    </template>

    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row,$index }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row,$index)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row,$index)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <addChannel ref="dialog" @success="onSuccess"></addChannel>
  </page-container>
</template>

<style lang="scss" scoped>

</style>
