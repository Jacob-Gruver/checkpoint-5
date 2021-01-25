import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { AppState } from '../AppState'

const apiUrl = '/api/blogs/'

class BlogService {
  async getblog(id) {
    try {
      const res = await api.get(apiUrl + id)
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

  async addComment(id, newComment) {
    try {
      await api.post('/api/comments/', newComment)
      this.getComments()
    } catch (error) {
      logger.error(error)
    }
  }

  async removeBlog(id) {
    try {
      await api.delete(apiUrl, id)
      this.getMyblogs()
    } catch (error) {
      logger.error(error)
    }
  }
}

export const blogService = new BlogService()
