import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class HomeService {
  async getBlogs() {
    try {
      const res = await api.get('/api/blogs')
      AppState.blogs = res.data
    } catch (error) {
      logger.error(error)
    }
  }
}

export const homeService = new HomeService()
