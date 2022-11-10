import type { intGroup } from '../types/intGroup'
import type { ResourceApiResponse } from '../types/ResourceApiResponse'
import api from './api'


class intGroupService {
  getAll(): Promise<ResourceApiResponse<intGroup>> {
    return api.get('resource/intGroup?fields=%5B%22*%22%5D')
  }
}

export default new intGroupService();