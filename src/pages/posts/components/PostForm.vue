<template>
  <div class="form">
    <div class="form__header">
      <div class="form__header-title">
        {{ formTitle }}
      </div>
    </div>

    <div class="form__body">
      <el-form
        ref="postFormInstance"
        :disabled="loading"
        :model="form"
        :rules="rules"
      >
        <el-form-item
          label="Image"
          prop="image"
        >
          <el-input v-model="form.image" />
        </el-form-item>

        <el-form-item
          label="Title"
          prop="title"
        >
          <el-input v-model="form.title" />
        </el-form-item>

        <el-form-item
          label="Text"
          prop="text"
        >
          <el-input v-model="form.text" />
        </el-form-item>

        <el-form-item
          label="Url"
          prop="url"
        >
          <el-input v-model="form.url" />
        </el-form-item>
      </el-form>
    </div>

    <div class="form__footer">
      <div class="form__actions">
        <el-button
          :loading="loading"
          @click="saveChanges"
        >
          Save
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
const defaultFormState = Object.freeze({
  title: '',
  text: '',
  image: '',
  url: '',
})

export default {
  name: "PostForm",
  props: {
    loading: Boolean,
    post: {
      type: Object,
      default: () => ({}),
    }
  },
  watch: {
    post: {
      handler() {
        this.clearFormValidate()

        this.form = {
          ...defaultFormState,
          ...this.post,
        }
      },
      deep: true,
      immediate: true,
    }
  },
  data() {
    return {
      form: {
        ...defaultFormState,
      },
      rules: {
        title: [
          {
            required: true,
            trigger: 'blur',
          }
        ],
        text: [
          {
            required: true,
            trigger: 'blur',
          }
        ],
        url: [
          {
            required: true,
            trigger: 'blur',
          },
          {
            type: 'url',
            trigger: 'blur',
          }
        ],
        image: [
          {
            required: true,
            trigger: 'blur',
          },
          {
            type: 'url',
            trigger: 'blur',
          },
          {
            validator: (rule, value, callback) => {
              if (/(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(this.form.image)) {
                callback()
              } else {
                callback(new Error('image is not a valid url'))
              }
            },
            trigger: 'blur',
          }
        ]
      },
    }
  },
  computed: {
    isCreateMode() {
      return Object.keys(this.post).length === 0
    },

    formTitle() {
      return this.isCreateMode ? 'Create post' : 'Update post'
    }
  },
  methods: {
    clearFormValidate() {
      if (!this.$refs?.postFormInstance?.clearValidate) return

      this.$refs.postFormInstance.clearValidate()
    },
    saveChanges() {
      this.$refs.postFormInstance.validate((valid) => {
        if (valid) {
          const event = this.isCreateMode ? 'create' : 'update'

          this.$emit(event, this.form)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  &__header {
    margin-bottom: 24px;

    &-title {
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>