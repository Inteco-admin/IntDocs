import api from './api'
import type { Issue, IssueDetails } from "../types/intIssue"
import type { ResourceApiResponse } from '../types/ResourceApiResponse'
class intIssueService {
  getAll(): Promise<ResourceApiResponse<Issue>> {
    return api.get('resource/intIssue?fields=%5B%22*%22%5D&limit=0')
  }
  async showDetails(docname: string): Promise<IssueDetails> {
    const doctype = 'intIssue'
    const res = await api.get('/method/frappe.desk.form.load.getdoc?', {
      params: {
        doctype: doctype,
        name: docname
      }
    })
    return res.data as IssueDetails
  }
  getListByModel(): Promise<ResourceApiResponse<Issue>> {
    const options = {
      params: {
        fields: '["*"]',
        // order_by: '["creation", "desc"]',
        filters: '[["modelname", "=", "model_kr_vr4.xkt"]]',
        // limit: 0
      }
    }
    return api.get('resource/intIssue', options)
  }
}

export default new intIssueService();

