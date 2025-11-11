<script setup>
// import { rules } from 'eslint-plugin-vue'
import {ref} from 'vue'
import {artAddChannelsService,artEditChannelsService} from '@/api/article'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)
const formRef = ref()

const emit = defineEmits(['success'])
const onSubmit = async ()=>{
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await artEditChannelsService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddChannelsService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}

const open =(row)=>{
  dialogVisible.value = true
  // formModel.value.cate_name = row.cate_name
  // formModel.value.cate_alias = row.cate_alias
  formModel.value = { ...row }  //上下是同样效果
}

const formModel = ref({
  cate_name:'',
  cate_alias:''
})

const rules = {
  cate_name:[
    {required:true,message:'请输入分类名称',trigger:'blur'},
    {pattern:/^\S{1,10}$/,message:'输入1-10位非空字符',trigger:'blur'}
  ],
  cate_alias:[
    {required:true,message:'请输入分类别名',trigger:'blur'},
    {pattern:/^[a-zA-Z0-9]{1,15}$/,message:'输入1-15位非中文',trigger:'blur'}
  ]
}

//将方法暴露出去
defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id?'编辑分类':'添加分类'"
    width="500"
  >
    <el-form
    ref="formRef" :rules="rules" :model="formModel" label-width="100px" style="padding-right: 45px;">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias" placeholder="请输入分类别名"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
