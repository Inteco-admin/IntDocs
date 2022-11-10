export const ColumnsDefinitions: Array<any> = [
  {
    name: "status",
    align: "left",
    label: "Статус",
    field: "workflow_state",
    sortable: true,
  },
  {
    name: "id",
    align: "left",
    label: "Заголовок",
    field: "displayname",
    sortable: true,
  },
  {
    name: "creation",
    align: "left",
    label: "Дата создания",
    field: "creation",
    sortable: true,
  },
];