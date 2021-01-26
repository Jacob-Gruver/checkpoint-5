import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { AppState } from '../AppState'

const apiUrl = '/api/blogs/'

class BlogService {
  async getblog(id) {
    try {
      const res = await api.get(apiUrl + id)
      logger.log(res.data)
      AppState.blog = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getMyblogs() {
    try {
      const res = await api.get('/account/blogs')
      AppState.myBlogs = res.data
      logger.log(AppState.myBlogs)
    } catch (error) {
      logger.error(error)
    }
  }

  async getComments(id) {
    try {
      const res = await api.get(apiUrl + id + '/comments')
      AppState.comments = res.data
      this.getblog()
    } catch (error) {
      logger.error(error)
    }
  }

  async addComment(account, id, newComment) {
    try {
      const comm = { body: newComment.body, blog: id, creator: account }
      logger.log('sevice', newComment.body + id + account + comm)
      const res = await api.post('/api/comments/', comm)
      logger.log(res.data)
      AppState.comments = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async editComment(editComment, id) {
    try {
      const edit = { body: editComment }
      const res = await api.put('/api/comments/' + id, edit)
      logger.log(res.data)
      AppState.comments = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteComment(id) {
    try {
      const res = await api.delete('/api/comments/' + id)
      logger.log(res.data)
      AppState.comments = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async removeBlog(id) {
    try {
      await api.delete(apiUrl + id)
      this.getMyblogs()
    } catch (error) {
      logger.error(error)
    }
  }

  async editBlogTitle(newBlog, id) {
    try {
      const blogData = { title: newBlog }
      const res = await api.put(apiUrl + id, blogData)
      logger.log(res)
      AppState.blogs = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async editBlogBody(newBlog, id) {
    try {
      const blogData = { body: newBlog }
      const res = await api.put(apiUrl + id, blogData)
      logger.log(res)
      AppState.blogs = res.data
    } catch (error) {
      logger.error(error)
    }
  }
}

export const blogService = new BlogService()
