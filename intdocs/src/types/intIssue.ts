export interface Issue {
  name: number;
  creation: string;
  modified: string;
  modified_by: string;
  owner: string;
  docstatus: number;
  idx: number;
  title: string;
  _user_tags?: any;
  _comments?: any;
  _assign?: any;
  _liked_by?: any;
  pdfcoords: string;
  pdfcamera: string;
  pdfpage: string;
  modelid?: any;
  _seen: string;
  displayname: string;
  project: string;
  type: string;
  doc: string;
  model?: any;
  workflow_state: string;
  amended_from?: any;
  docname: string;
  typename: string;
  description?: any;
  intassign?: any;
  duedate?: any;
  customassign?: any;
  customassingname?: any;
  osklocation?: any;
  osksubsystem?: any;
  oskequipment?: any;
  osksubsystemname?: any;
  intassingname?: any;
}

export interface Doc {
  name: number;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  workflow_state: string;
  title: string;
  type: string;
  project: string;
  typename: string;
  description: string;
  intassign: string;
  duedate: string;
  customassign: string;
  customassingname: string;
  osklocation: string;
  osksubsystem: string;
  oskequipment: string;
  osksubsystemname: string;
  intassingname: string;
  doctype: string;
  doc: string;
  docname: string;
}


export interface Attachment_log {
  name: string;
  creation: string;
  content: string;
  owner: string;
  comment_type: string;
}

export interface Attachment {
  name: string;
  file_name: string;
  file_url: string;
  is_private: number;
}

export interface Version {
  name: number;
  owner: string;
  creation: string;
  data: string;
}

export interface If_owner { }

export interface Permission {
  if_owner: If_owner;
  has_if_owner_enabled: boolean;
  select: number;
  read: number;
  write: number;
  create: number;
  delete: number;
  submit: number;
  cancel: number;
  amend: number;
  print: number;
  email: number;
  report: number;
  import: number;
  export: number;
  set_user_permissions: number;
  share: number;
}

export interface View {
  name: number;
  creation: string;
  owner: string;
}

export interface Docinfo {
  user_info: any;
  comments: any[];
  shared: any[];
  assignment_logs: any[];
  attachment_logs: Attachment_log[];
  info_logs: any[];
  like_logs: any[];
  workflow_logs: any[];
  attachments: Attachment[];
  communications: any[];
  automated_messages: any[];
  total_comments: number;
  versions: Version[];
  assignments: any[];
  permissions: Permission;
  views: View[];
  energy_point_logs: any[];
  additional_timeline_content: any[];
  milestones: any[];
  is_document_followed?: any;
  tags: string;
  document_email?: any;
}

export interface _link_title { }

export interface IssueDetails {
  docs: Doc[];
  docinfo: Docinfo;
  _link_titles: _link_title;
}



