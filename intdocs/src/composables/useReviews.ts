import { ref } from 'vue'
import api from '../services/api.js'
import intDocService from '../services/intDocService';
import { intDoc } from '../types/intDoc';
import { Review } from "../types/intReview";
import { ResourceApiData, ResourceApiResponse } from '../types/ResourceApiResponse';

type AssignedUser = {
  assign_to_me: number;
  assign_to: [string];
  doctype: Review;
  name: string;
  bulk_assign: boolean;
  re_assign: boolean;
}

export function useReviews() {
  const review = ref<Review>(null);
  const reviews = ref<Review[]>([]);
  const loading = ref(true);
  const docs = ref<intDoc[]>([])
  const doc = ref<intDoc>(null)

  const createReview = async payload => {
    try {
      const { data } = await api.post('method/frappe.desk.form.save.savedocs', payload);
      return data.docs[0]
    } catch (e) {}
  };

  const assignUserToReview = ({ name, users }) => {
    return api.post('method/frappe.desk.form.assign_to.add', {
      name,
      assign_to_me: 0,
      assign_to: users,
      doctype: 'intReview',
      bulk_assign: false,
      re_assign: false,
    });
  };

  const fetchDoc = (name) => {
    loading.value = true;

    return api.get('/method/frappe.desk.form.load.getdoc?', {
      params: {
        doctype: 'intDoc',
        name
      }
    }).then(({ data }) => {
      doc.value = data.docs[0]
    }).finally(() => {
      loading.value = false;
    })
  };

  const fetchReview = async (name) : Promise<void> => {
    loading.value = true

    const options= {
      params: {
      fields: '["*"]',
      filters: `[["doc", "=", "${name}"]]`
      }
    }

    api.get('resource/intReview', options)
    .then(({data}) => {
      review.value = data.data[0]
    })
    .finally(() => loading.value = false)
  }

  const loadDocs = (project) : void => {
    loading.value = true

    intDocService.getAllForReview(project)
      .then(res => docs.value = res.data.data)
      .finally(() => {
      loading.value = false
    })
  };

  return {
    loading,
    fetchDoc,
    loadDocs,
    review,
    reviews,
    createReview,
    assignUserToReview,
    docs,
    doc,
    fetchReview
  }
}