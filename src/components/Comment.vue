<template>
  <p>
    {{ commentProp.body }} -
    {{ commentProp.creator.name }}
  </p>
  <button class="btn btn-danger" @click="deleteComment(commentProp.id)">
    Delete
  </button>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import { logger } from '../utils/Logger'
export default {
  name: 'Comments',
  props: {
    commentProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      async deleteComment(id) {
        try {
          logger.log(id)
          blogService.deleteComment(id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>
