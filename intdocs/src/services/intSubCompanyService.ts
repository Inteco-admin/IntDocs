import api from './api'
import type { intSubCompany } from "../types/intSubCompany"
import type { ResourceApiResponse } from 'src/types/ResourceApiResponse';


class intSubCompanyService {
  getAll(): Promise<ResourceApiResponse<intSubCompany>> {
    return api.get('resource/intSubCompany?fields=%5B%22*%22%5D&limit=0')
  }
}

export default new intSubCompanyService();