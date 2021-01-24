<template>
  <div class="about text-center">
    <div class="row">
      <div class="col">
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>{{  }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import { logger } from '../utils/Logger'
export default {
  name: 'Account',
  setup() {
    onMounted(() => {
      try {
        accountService.getMyBlogs()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      account: computed(() => AppState.account)
      // blog: computed(() => Appstate.blog)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
