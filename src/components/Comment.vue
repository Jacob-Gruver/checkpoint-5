<template>
  <p>
    {{ commentProp.body }} -
    {{ commentProp.creator.name }}
  </p>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
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
      state
    }
  }
}
</script>
