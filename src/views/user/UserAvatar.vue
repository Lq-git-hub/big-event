<script setup>
import pageContainer from '@/components/pageContainer.vue'
import {ref} from 'vue'
import { Plus,Upload } from '@element-plus/icons-vue'
import { useUserstore } from '@/stores'
import {userUpdataAvatarService} from '@/api/user'
import { ElMessage } from 'element-plus'

const uploadRef = ref()
const useStore = useUserstore()
const imageUrl = ref(useStore.user.user_pic)

const onUploadFile = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
  }
}
const onUpdateAvatar = async () => {
  await userUpdataAvatarService({ avatar: imageUrl.value })
  await useStore.getUser()
  ElMessage({ type: 'success', message: '更换头像成功' })
}
</script>

<template>
  <page-container title="更换头像">
    <el-upload
    ref="uploadRef"
    :on-change="onUploadFile"
    :auto-upload="false"
    class="avatar-uploader"
    :show-file-list="false"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>

  </el-upload>
  <br>
  <el-button @click="uploadRef.$el.querySelector('input').click()" type="primary" :icon="Plus" size="large">选择图片</el-button>
  <el-button @click="onUpdateAvatar" type="success" :icon="Upload" size="large">上传头像</el-button>
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
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
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
