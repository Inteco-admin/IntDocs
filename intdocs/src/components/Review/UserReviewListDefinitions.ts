import moment from "moment"

moment.locale('ru')

export const UserReviewListDefinitions: Array<any> = [
  {
    name: "status",
    align: "left",
    label: "Статус",
    field: "status",
    sortable: true,
  },
  {
    name: "review",
    align: "left",
    label: "Согласование",
    field: "reference_name",
    sortable: true,
  },
  {
    name: "user",
    align: "left",
    label: "Назначено",
    field: "allocated_to",
    sortable: true,
  },
  {
    name: "date",
    align: "left",
    label: "Изменено",
    field: "modified",
    sortable: true,
    format: (val) => moment(val).format('LLL')
  },
  {
    name: "assigmentverdict",
    align: "left",
    label: "Решение",
    field: "assigmentverdict",
    sortable: true,
  },

]