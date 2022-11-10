export const GetBGClass = function (status_name) {
  switch (status_name) {
    case "Open":
      return "bg-open";
    case "In Disput":
      return "bg-indispute";
    case "Submited":
      return "bg-submited";
    case "Pending":
      return "bg-pending";
    case "In Work":
      return "bg-inwork";
    case "Ready to inspect":
      return "bg-ready";
    case "Not Approved":
      return "bg-notapproved";

    default:
      return "bg-gray-200";
  }
}


export const GetBorderClass = function (status_name) {
  switch (status_name) {
    case "Open":
      return "border-open";
    case "In Disput":
      return "border-indispute";
    case "Submited":
      return "border-submited";
    case "Pending":
      return "border-pending";
    case "In Work":
      return "border-inwork";
    case "Ready to inspect":
      return "border-ready";
    case "Not Approved":
      return "border-notapproved";

    default:
      return "border-gray-500";
  }
}

export const GetHoverBorderClass = function (status_name) {
  switch (status_name) {
    case "Open":
      return "hover:border-open";
    case "In Disput":
      return "hover:border-indispute";
    case "Submited":
      return "hover:border-submited";
    case "Pending":
      return "hover:border-pending";
    case "In Work":
      return "hover:border-inwork";
    case "Ready to inspect":
      return "hover:border-ready";
    case "Not Approved":
      return "hover:border-notapproved";

    default:
      return "hover:border-gray-500";
  }
}
