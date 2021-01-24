<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <h1 class="my-5 bg-dark text-light p-3 rounded d-flex align-items-center">
      <span class="mx-2 text-white">Blog For All And All For Blog!</span>
    </h1>
    <Blogs v-for="blog in state.blogs" :key="blog.id" :blog-prop="blog" />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { homeService } from '../services/HomeService'
import { logger } from '../utils/Logger'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      blogs: computed(() => AppState.blogs),
      account: computed(() => AppState.account)
    })
    onMounted(() => {
      try {
        homeService.getBlogs()
      } catch (error) {
        logger.log(error)
      }
      logger.log(state.account)
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
