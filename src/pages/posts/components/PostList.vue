<template>
  <div class="posts">
    <div
      v-if="posts.length"
      class="posts__list"
    >
      <div
        v-for="post in posts"
        :key="post.id"
        class="posts__list-item"
      >
        <post-item
          :post="post"
          @update="$emit('update', post)"
          @remove="$emit('remove', post)"
        />
      </div>
    </div>

    <el-empty
      v-else
      description="No data..."
    />
  </div>
</template>

<script>
import PostItem from "@/pages/posts/components/PostItem";

export default {
  name: "PostList",
  components: {
    PostItem
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.posts {
  overflow: hidden;

  &__list {
    display: flex;
    flex-wrap: wrap;

    &-item {
      flex: 0 0 33.33%;

      padding: 0 20px 20px;
    }
  }
}
</style>