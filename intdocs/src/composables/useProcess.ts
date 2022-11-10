import { ref } from 'vue';
import api from "../services/api";

const DOCTYPE = 'intReviewProcess';

export function useProcess() {
  const loading = ref(false);
  const process = ref(null);
  const processList = ref([])

  const fetchProcess = async (name) => {
    loading.value = true;

    try {
      const { data: {
        docs
      }} = await api.get('/method/frappe.desk.form.load.getdoc?', {
        params: {
          doctype: DOCTYPE,
          name
        }
      });

      process.value = docs[0];
      return process.value;
    } catch (e) {

    } finally {
      loading.value = false;
    }
  };

  const fetchProcessList = async (projectname: string) => {
    loading.value = true;

    try {
      const options = {
        params: {
          fields: '["*"]',
          filters: `[["project", "=", "${projectname}"]]`,
          order_by: 'displayname',
          limit: '0'
        },
      }
      const { data } = await api.get(`resource/${DOCTYPE}`, options);
      processList.value = data.data
    } catch (e) {

    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    process,
    processList,
    fetchProcess,
    fetchProcessList
  }
}