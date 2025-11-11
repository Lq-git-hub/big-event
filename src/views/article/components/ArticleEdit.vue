<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import {ref} from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import {atrAddListService,artGetDetailService,artEditService} from '@/api/article'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { nextTick } from 'vue'
import { baseURL } from '@/utils/request';
import axios from 'axios'

const visibleDrawer = ref(false)
const imgUrl = ref('')
const editorRef = ref()

const defaultForm = ref({
  // id:'',
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
})
const formModel = ref({...defaultForm.value})

// 添加 和 编辑，可以共用一个抽屉，所以可以将抽屉封装成一个组件
// 组件对外暴露一个方法 open,  基于 open 的参数，初始化表单数据，并判断区分是添加 还是 编辑
// 1. open({ })                   =>  添加操作，添加表单初始化无数据
// 2. open({ id: xx,  ...  })  =>  编辑操作，编辑表单初始化需回显
const open =async (row)=>{
  if (row.id) {
    // formModel.value = {...row}
    const res = await artGetDetailService(row.id)
    formModel.value = res.data.data
    imgUrl.value = baseURL+formModel.value.cover_img
    formModel.value.cover_img = await imageUrlToFile(imgUrl.value, formModel.value.cover_img)
  } else {
    formModel.value = { ...defaultForm.value }
    imgUrl.value = ''
    await nextTick()
    if (editorRef.value) {
      editorRef.value.setHTML("")
    }
  }
  visibleDrawer.value = true
}
defineExpose({
  open
})

const onSelectFile = (onUploadFile)=>{
  console.log(onUploadFile) // 这是选择的图片的东西
  imgUrl.value = URL.createObjectURL(onUploadFile.raw) // 预览图片
  formModel.value.cover_img = onUploadFile.raw // 要存入，将来用于提交
}

const emit = defineEmits(['success'])
// 发布和草稿
const onPublish =async (state)=>{
  formModel.value.state = state  // 存状态
  //接口需要formdata对象
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key,formModel.value[key])
  }

  if (formModel.value.id) {
    console.log('是编辑')
    await artEditService(fd)
    ElMessage.success('编辑成功')
    visibleDrawer.value = false
    emit('success','edit')
  } else {
    await atrAddListService(fd)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    emit('success','add')
  }
}
// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const imageData = response.data;

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], { type: response.headers['content-type'] });

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type });

    return file;
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error);
    throw error;
  }
}
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title" style="width: 300px;">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <ChannelSelect
          v-model="formModel.cate_id"
          width="100%"
        ></ChannelSelect>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <QuillEditor
          ref="editorRef"
           theme="snow"
           v-model:content="formModel.content"
           content-Type="html"
           />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
