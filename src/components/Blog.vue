<template>
  <div class="row">
    <div class="col">
      <router-link :to="{ name: 'BlogPage', params: { id: blogProp.id }}">
        <div class="card">
          <img class="card-top">
          <div class="card-body">
            <h4 class="card-title">
              {{ blogProp.title }}
            </h4>
            <p class="card-text">
              {{ blogProp.creator.name }}
            </p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Blogs',
  props: {
    blogProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state
    }
  }
}
</script>
