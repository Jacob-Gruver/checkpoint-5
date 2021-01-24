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

  async getComments(id) {
    try {
      const res = await api.get(apiUrl + id + '/comments')
      AppState.comments = res.data
    } catch (error) {
      logger.error(error)
    }
  }
}

export const blogService = new BlogService()
