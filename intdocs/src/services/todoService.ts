import type { ResourceApiResponse } from '../types/ResourceApiResponse';
import type { Todo } from '../types/Todo';
import api from './api'

const DOCTYPE = 'ToDo'

class todoService {
  getAll(): Promise<ResourceApiResponse<Todo>> {
    return api.get(`resource/${DOCTYPE}?fields=%5B%22*%22%5D&order_by=displayname%20desc&limit=0`)
  }

  getListByReferenceName(reference_name: string): Promise<ResourceApiResponse<Todo>> {
    const options = {
      params: {
        fields: '["*"]',
        order_by: '"creation"',
        filters: `[["reference_name", "=", "${reference_name}"]]`
      },
    }
    return api.get(`resource/${DOCTYPE}`, options)
  }

  getListByUser(username: string): Promise<ResourceApiResponse<Todo>> {
    const options = {
      params: {
        fields: '["*"]',
        order_by: '"creation"',
        filters: `[["allocated_to", "=", "${username}"]]`
      },
    }
    return api.get(`resource/${DOCTYPE}`, options)
  }
}

export default new todoService();