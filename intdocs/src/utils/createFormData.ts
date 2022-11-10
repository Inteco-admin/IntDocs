export default function createFormData(obj: object): FormData {
  const formData = new FormData();

  for (const prop in obj) {
    formData.append(prop, obj[prop])
  }

  return formData;
}