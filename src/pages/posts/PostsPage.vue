<template>
<div class="page page--posts">
  <div class="page__header">
    <el-button
      type="primary"
      @click="openPostForm()"
    >
      Create new post
    </el-button>
  </div>

  <div class="page__body">
    <post-list
      :posts="posts"
      @update="handlerUpdatePost"
      @remove="handlerRemovePost"
    />
  </div>

  <el-dialog
    v-model="isVisiblePostForm"
    @closed="clearPostForm"
  >
    <post-form
      :post="postFormData"
      :loading="isLoading"
      @update="onUpdatePost"
      @create="onCreatePost"
    />
  </el-dialog>
</div>
</template>

<script>
import { ElMessageBox } from 'element-plus'

import PostService from "@/api/PostService";

import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

export default {
  name: "PostsPage",
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      isLoading: false,
      isVisiblePostForm: false,

      posts: [],
      postFormData: {},
    }
  },
  created() {
    this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
      this.isLoading = true

      this.posts = await PostService
          .getAll()
          .finally(() => this.isLoading = false)
    },

    openPostForm(formData = {}) {
      this.isVisiblePostForm = true

      this.postFormData = formData
    },
    closePostForm() {
      this.isVisiblePostForm = false

      this.clearPostForm()
    },
    clearPostForm() {
      this.postFormData = {}
    },

    handlerUpdatePost(post) {
      this.openPostForm(post)
    },
    handlerRemovePost(post) {
      ElMessageBox.confirm(
        'Post will delete. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      ).then(() => {
        this.onRemovePost(post)
      })
    },

    onCreatePost(post) {
      this.isLoading = true

      PostService
        .create(post)
        .then((result) => {
          this.isLoading = false

          this.posts.push(result)
        })
    },
    onUpdatePost(post) {
      const { id: updatePostId } = post

      this.isLoading = true

      PostService
        .update(updatePostId, post)
        .then(() => {
          const updatedPostIndex = this.posts.findIndex(({ id }) => id === updatePostId)

          this.posts[updatedPostIndex] = post

          this.closePostForm()
        })
        .finally(() => this.isLoading = false)
    },
    onRemovePost(post) {
      const { id: deletePostId } = post

      this.isLoading = true

      PostService
          .remove(deletePostId)
          .then(() => this.posts = this.posts.filter(({ id }) => id !== deletePostId))
          .finally(() => this.isLoading = false)
    },
  }
}
</script>

<style lang="scss" scoped>
.page {
  &__header {
    padding: 20px 20px 40px;
  }
}
</style>