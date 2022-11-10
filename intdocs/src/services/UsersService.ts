import api from './api'
import type { APIUser } from "../types/User"
import type { SelectDTO } from '../types/SelectDTo'
import type { ResourceApiResponse } from 'src/types/ResourceApiResponse';


class UserService {
  getAll(): Promise<ResourceApiResponse<APIUser>> {
    return api.get('resource/User?fields=%5B%22*%22%5D&limit=0')
  }

  async getAllForSelect(): Promise<SelectDTO[]> {
    const res = await this.getAll();
    const DTOarr: SelectDTO[] = [];
    res.data.data.forEach(user => {
      DTOarr.push({
        name: user.full_name,
        value: user.full_name,
        id: user.name,
      })
    })

    return DTOarr;
  }
}

export default new UserService();