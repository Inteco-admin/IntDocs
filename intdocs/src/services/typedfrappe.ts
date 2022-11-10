import api from './api.js';
import { TypesResponse } from '../types/IntIssueType.js';
import { IssueResponse } from '../types/intIssue.js';



export const LoadTypes = async (): Promise<TypesResponse> => {
  let data: { data: TypesResponse }
  data = await api.get<TypesResponse>('/resource/intIssueType?fields=["*"]')

  return data.data
}



export const loadIssues = async (project: string): Promise<IssueResponse> => {

  const res = await api.get(
    `resource/intIssue?fields=["*"]
    &filters=[["project", "=", "${project}"]]&order_by=creation%20desc&limit=0`
  )
  return res.data
}





