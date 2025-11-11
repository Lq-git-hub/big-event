<script setup>
import pageContainer from '@/components/pageContainer.vue'  // 导入自定义组件
import { ElLoading } from 'element-plus'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import ArticleEdit from './components/ArticleEdit.vue'
import {artGetListService,artDelService} from '@/api/article'
import { formatTime } from '@/utils/format'
import {ref} from 'vue'
const articleEditRef = ref() // haha
const loading = ref(false)


const params = ref({
  pagenum:1,
  pagesize:5,
  cate_id:'',
  state:''
})
const total = ref()
const articleList = ref([])
// 获取文章列表
const getArticleList = async ()=>{
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()

// 编辑文章
const onEditArticle = (row)=>{
  articleEditRef.value.open(row)
}
// 添加文章
const onAddArticle = ()=>{
  articleEditRef.value.open({})
}
// 删除文章
const onDelArticle =async (row)=>{
  await artDelService(row.id)
  getArticleList()
}
// 每页最大数量
const handleSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
// 改变当前页
const handleCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}
// 搜索
const onSearch = ()=>{
  loading.value = true
  params.value.pagenum = 1
  getArticleList()
  loading.value = false
}
// 重置
const onReset = ()=>{
  loading.value = true
  params.value.cate_id = ''
  params.value.pagenum = 1
  params.value.state = ''
  getArticleList()
  loading.value = false
}

// 添加或编辑 成功的回调
const onSuccess = (type)=>{
  if (type === 'add') {
    params.value.pagenum = Math.ceil((total.value+1)/params.value.pagesize)
  }
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>

    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类">

        <ChannelSelect v-model="params.cate_id"></ChannelSelect>

      </el-form-item>
      <el-form-item label="发布状态">
        <el-select
          v-model="params.state"
          placeholder="请选择"
          style="width: 200px;padding-right:15px ;"
          clearable
        >
          <el-option label="已发布" value="已发布" />
          <el-option label="草稿" value="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
     <el-table v-loading="loading" :data="articleList" style="width: 100%">
      <el-table-column label="文章分类">
        <template #default="{row}">
          <el-link type="primary" style="margin-left: 10px">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name">
      </el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{row}">
          <span>{{ formatTime(row.pub_date) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button :icon="Delete" circle plain type="danger"
            @click="onDelArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
     </el-table>

     <!-- 分页区域 -->
      <el-pagination
        style="margin: 20px;justify-content: flex-end;"
        v-model:current-page="params.pagenum"
        v-model:page-size="params.pagesize"
        :page-sizes="[2, 3, 5, 10]"
        :background="true"
        layout="jumper,total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

      <!-- 抽屉 -->
     <Article-edit @success="onSuccess" ref="articleEditRef"></Article-edit>

  </page-container>
</template>

<style lang="scss" scoped>

</style>
