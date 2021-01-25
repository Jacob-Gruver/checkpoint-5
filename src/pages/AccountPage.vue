<template>
  <div class="about text-center">
    <div class="row">
      <div class="col">
        <h1>Welcome {{ state.account.name }}</h1>
        <img class="rounded" :src="state.account.picture" alt="" />
        <p>{{ state.account.email }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col" v-for="myBlog in state.myBlogs" :key="myBlog.id">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">
              {{ myBlog.title }}
            </h4>
            <p class="card-text">
              {{ myBlog.body }} - {{ myBlog.id }}
            </p>
            <button class="btn btn-danger" @click="removeBlog(myBlog.id)">
              Remove Blog
            </button>
            <button class="btn btn-warning" @click="editBlog(myBlog.id)">
              Edit Blog
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
          Add Blog
        </button>

        <!-- Modal -->
        <div class="modal fade"
             id="modelId"
             tabindex="-1"
             role="dialog"
             aria-labelledby="modelTitleId"
             aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">
                  Add Blog
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="alert('this is an alert')">
                  <input type="text"
                         name="title"
                         title="title"
                         class="form-control"
                         placeholder="Add Title"
                         v-model="state.newBlog.title"
                  >
                  <input type="text"
                         name="body"
                         title="body"
                         class="form-control"
                         placeholder="Add Body"
                         v-model="state.newBlog.body"
                  >

                  <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" @click="addNewBlog" class="btn btn-primary" data-dismiss="modal">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import { logger } from '../utils/Logger'
import { blogService } from '../services/BlogService'
export default {
  name: 'Account',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      blogs: computed(() => AppState.blogs),
      myBlogs: computed(() => AppState.myBlogs),
      newBlog: {}
    })
    onMounted(() => {
      try {
        blogService.getMyblogs()
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      async addNewBlog() {
        try {
          logger.log(state.account, state.blog)
          accountService.addNewBlog(state.newBlog)
        } catch (error) {
          logger.error(error)
        }
      },
      async findMyBlogs() {
        try {
          blogService.getMyblogs()
        } catch (error) {
          logger.log(error)
        }
      },
      async removeBlog(id) {
        try {
          blogService.removeBlog(id)
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
