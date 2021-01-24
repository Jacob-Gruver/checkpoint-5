<template>
  <p>
    {{ commentProp.body }}
  </p>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
// import { logger } from '../utils/Logger'
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
    // logger.log('logging from comment', commentProp)
    return {
      state
    }
  }
}
</script>
