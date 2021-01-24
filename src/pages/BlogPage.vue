<template>
  <div class="blog">
    <!-- <img :src="state.blog.creator.picture"> -->
    <h1>{{ state.blog.title }}</h1>
    <Comments v-for="comment in state.comments" :key="comment.id" :comment-prop="comment" />
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
export default {
  name: 'BlogPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      blog: computed(() => AppState.blog),
      comments: computed(() => AppState.comments)
    })
    // logger.log('logged from blogpage comments', AppState.comments)
    onMounted(async() => {
      try {
        blogService.getblog(route.params.id)
      } catch (error) {
        logger.error(error)
      }
      try {
        blogService.getComments(route.params.id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state
    }
  }
}
</script>
