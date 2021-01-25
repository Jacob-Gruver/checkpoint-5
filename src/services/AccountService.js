import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const accounturl = '/account'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get(accounturl)
      AppState.account = res.data
      // logger.log('logging account from Accountservice', AppState.account)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async addNewBlog(newBlog) {
    try {
      const res = await api.post('/api/blogs', newBlog)
      logger.log('logging from Account Service', res.data)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const accountService = new AccountService()
