<template>
<div class="post">
  <div class="post__body">
    <div class="post__photo">
      <el-image :src="post.image" />
    </div>

    <div class="post__title">
      {{ post.title }}
    </div>

    <div class="post__content">
      {{ post.text }}
    </div>
  </div>

  <div class="post__footer">
    <div class="post__actions">
      <el-button
        type="primary"
        plain
        @click="$emit('update', post)"
      >
        Update
      </el-button>

      <el-button
        type="danger"
        plain
        @click="$emit('remove', post)"
      >
        Delete
      </el-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.post {
  box-shadow: var(--el-box-shadow-light);

  padding: 15px;

  &__photo {
    position: relative;
    width: 100%;

    padding-top: 50%;
    margin-bottom: 15px;

    :deep(.el-image) {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;

      img {
        object-fit: cover;
      }
    }
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    word-break: break-all;
    color: var(--el-color-info);

    margin-bottom: 10px;

    &:first-letter {
      text-transform: uppercase;
    }
  }

  &__content {
    font-size: 14px;
    word-break: break-all;
  }

  &__footer {
    margin-top: 15px;
  }
}
</style>