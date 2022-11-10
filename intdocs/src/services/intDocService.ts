import type { intDoc } from '../types/intDoc'
import type { ResourceApiResponse } from '../types/ResourceApiResponse'
import api from './api'


class intDocService {
  getAll(): Promise<ResourceApiResponse<intDoc>> {
    return api.get('resource/intDoc?fields=%5B%22*%22%5D')
  }
  getAllForReview(projectname: string): Promise<ResourceApiResponse<intDoc>> {
    const options = {
    params: {
        fields: '["*"]',
        filters: `[["project", "=", "${projectname}"],["workflow_state", "!=", "Pending"]]`,
        order_by: 'creation desc',
        limit: '0'
      },
    }
    return api.get('resource/intDoc', options)
  }
}

export default new intDocService();