export enum Statuses {
  Approved = 'Approved',
  Pending = 'Pending'
}

export const isApproved = status => status === Statuses.Approved

export const isPending = status => status === Statuses.Pending