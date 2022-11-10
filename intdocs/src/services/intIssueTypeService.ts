import { ResourceApiResponse } from "../types/ResourceApiResponse";
import type { intIssueType } from "../types/IntIssueType";
import type { SelectDTO } from "../types/SelectDTo";
import api from "./api"


class intIssueTypeService {
  getAll(): Promise<ResourceApiResponse<intIssueType>> {
    return api.get('resource/intIssueType?fields=%5B%22*%22%5D&limit=0')
  }

  async getAllForSelect(): Promise<SelectDTO[]> {
    const res = await this.getAll();
    const DTOarr: SelectDTO[] = [];
    res.data.data.forEach(
      (x) => {
        DTOarr.push(
          {
            name: x.displayname,
            value: x.displayname,
            id: x.name,
          }
        );
      }
    );
    return DTOarr;
  }
}

export default new intIssueTypeService();