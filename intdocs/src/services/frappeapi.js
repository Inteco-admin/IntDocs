import api from './api'

export const loadIssues = async (project) => {
  console.log(project.value.name)
  const res = await api.get(
    `resource/intIssue?fields=["*"]&filters=[["project", "=", "${project.value.name}"]]&order_by=creation%20desc&limit=100`
  )
  return res.data.data
}

export const loadProjects = async () => {
  const res = await api.get(
    'resource/intProject?fields=["*"]'
  )

  return res.data.data
}

export const loadUser = async () => {
  const res = await api.get('/method/frappe.integrations.oauth2.openid_profile')
  const data = res.data
  if (data)
    return data
}

export const loadDetails = async (doctype, docname) => {

  const res = await api.get('/method/frappe.desk.form.load.getdoc?', {
    params: {
      doctype: doctype,
      name: docname
    }
  })
  console.log(res.data)
  return res.data

}
export const AddComment = async (docname, content, useremail, username) => {
  const form = new FormData();
  form.append("reference_doctype", "intIssue");
  form.append("reference_name", docname);
  form.append("content", content);
  form.append("comment_email", useremail);
  form.append("comment_by", username);

  const options = {
    method: 'POST',
    data: form
  };

  api.request('/method/frappe.desk.form.utils.add_comment', options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

export const AddAttachment = async (docname, filename) => {
  console.log(filename instanceof Array)
  filename.forEach((file) => {
    const form = new FormData();
    let temp_basefile = file.name.split('.').slice(0, -1).join('.');
    let rnd = Math.random(Math.floor(Date.now() / 1000)).toString(36).slice(-6);
    let temp_filename = "intIssue(" + docname + ")-" + temp_basefile + rnd + "." + file.name.split('.').pop();
    form.append("is_private", 0);
    form.append("folder", "Home/Attachments");
    form.append("optimize", "true");
    form.append("doctype", "intIssue");
    form.append("docname", docname);
    form.append("file", file, temp_filename);

    const options = {
      method: 'POST',
      data: form
    };

    api.request('/method/upload_file', options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  });
}

export const AddFiles = async (meta, filename) => {
  const form = new FormData();
  form.append("is_private", 0);
  form.append("folder", "Home");
  form.append("file", filename, filename.name);

  const options = {
    method: 'POST',
    data: form
  };

  const resp = await api.request('/method/upload_file', options)
    .then(async (response) => {
      const formIntDoc = new FormData();
      let temp_basefile = filename.name.split('.').slice(0, -1).join('.');
      formIntDoc.append("displayname", temp_basefile);
      formIntDoc.append("project", meta.project);
      formIntDoc.append("filepdf", response.data.message.name);
      formIntDoc.append("section", meta.section);

      const options = {
        method: 'POST',
        data: formIntDoc
      };

      await api.request('/resource/intDoc', options)
        .then((inner_response) => {
          response.data.message.inner_response = inner_response;
        })
        .catch((err) => {
          throw {
            statusText: 'On doc create: ' + temp_basefile,
            status: err.response.status,
            response: { status: err.response.status }
          }
        });

      response.data.message.original_name = filename.name;
      return response;
    })
    .catch((error) => {
      throw {
        statusText: 'On upload file:' + filename.name,
        status: error.response.status
      }
    });

  return resp;

}

// export const newIntDoc = async (content) => {
//   const form = new FormData();
//   form.append("displayname", content.displayName);
//   form.append("project", content.project);
//   form.append("filepdf", content.filePdf);
//   form.append("section", content.section);

//   const options = {
//     method: 'POST',
//     data: form
//   };

//   const resp = await api.request('/resource/intDoc', options)
//     .then( (response) => {
//       return response
//     })
//     .catch( (error) => {
//       throw {
//         statusText: 'On upload file:' + filename.name,
//         status: error.response.status
//       }
//     });

//   return resp;
// }

export const deleteIntDoc = async (content) => {
  const options = {
    method: 'DELETE'
  }

  let respIntDoc = await api.request('/resource/' + content.doctype + '/' + content.name, options)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw {
        statusText: 'On doc delete:' + error.response.statusText,
        status: error.response.status
      }
    });

  let res = {
    "doc": content.name,
    "result": respIntDoc.data.message
  };

  if (content.filepdf) {
    let respFile = await api.request('/resource/File/' + content.filepdf, options)
      .then((response) => {
        return response
      })
      .catch((error) => {
        throw {
          statusText: 'On file delete:' + error.response.statusText,
          status: error.response.status
        }
      });

    res.filepdf = { "name": content.filepdf, "result": respFile.data.message };
  }

  return res;
}