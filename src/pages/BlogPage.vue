<template>
  <div class="blog">
    <div class="row">
      <div class="col">
        <h1 @click="state.editComments = true">{{ state.blog.title }}</h1>
        <Comments v-for="comment in state.comments" :key="comment.id" :comment-prop="comment" :contenteditable="state.editComments" @blur="editComment($event, comment.id)" />
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <form>
        <input type="text"
               name="comment"
               title="comment"
               class="form-control"
               placeholder="Add Comment"
               v-model="state.newComment.body"
        >
        <button type="submit" class="btn btn-success" @click="addComment">
          Add a Comment
        </button>
      </form>
    </div>
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
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      newComment: {
      },
      editComments: false
    })
    logger.log('logged from blogpage comments', AppState.comments)
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
      state,
      async addComment() {
        try {
          // logger.log('page', state.account)
          blogService.addComment(state.account.name, state.blog.id, state.newComment)
        } catch (error) {
          logger.error(error)
        }
      },
      async editComment(e, id) {
        try {
          blogService.editComment(e.target.innerText, id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>
