import type { ResourceApiResponse } from '../types/ResourceApiResponse';
import type { Project } from '../types/Project';
import api from './api'


class intProjectService {
  getAll(): Promise<ResourceApiResponse<Project>> {
    return api.get('resource/intProject?fields=%5B%22*%22%5D&order_by=displayname%20desc&limit=0')
  }

}

export default new intProjectService();