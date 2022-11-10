import { ResourceApiResponse } from 'src/types/ResourceApiResponse';
import { intOskClassifier } from '../types/intOskClassifier';
import api from './api'



class intOskClassifierService {
  getAll(): Promise<ResourceApiResponse<intOskClassifier>> {
    return api.get('resource/intOskClassifier?fields=%5B%22*%22%5D&limit=0')
  }

}

export default new intOskClassifierService();