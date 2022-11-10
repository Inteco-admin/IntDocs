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
    align: "center",
    label: "Номер",
    field: "name",
    sortable: true,
  },
  {
    name: "type",
    align: "center",
    label: "Тип замечания",
    field: "typename",
    sortable: true,
  },
  {
    name: "title",
    align: "left",
    label: "Заголовок",
    field: "title",
    sortable: true,
  },
  {
    name: "date",
    align: "center",
    label: "Крайний срок",
    field: "duedate",
    sortable: true,
  },
  {
    name: "assign",
    align: "center",
    label: "Назначено",
    field: "intassingname",
    sortable: true,
  },
];