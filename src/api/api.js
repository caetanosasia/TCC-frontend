const apiPath = process.env.REACT_APP_API;

const requestOptions = (method, bodyContent, token) => {
  let options = {};
  switch (method) {
    case 'POST': {
      let postHeaders = {
        'Content-Type': 'application/json',
      };
      if (token) {
        postHeaders = { ...postHeaders, Authorization: `Bearer ${token}` };
      }

      options = {
        method,
        headers: postHeaders,
        body: JSON.stringify(bodyContent),
      }; }
      break;
    case 'GET': {
      let getHeaders = {
        'Content-Type': 'application/json',
      };
      if (token) {
        getHeaders = { ...getHeaders, Authorization: `Bearer ${token}` };
      }
      options = {
        method,
        headers: getHeaders,
      }; }
      break;
    case 'DELETE': {
      let delHeaders = {
        'Content-Type': 'application/json',
      };
      if (token) {
        delHeaders = { ...delHeaders, Authorization: `Bearer ${token}` };
      }
      options = {
        method,
        body: JSON.stringify(bodyContent),
        headers: delHeaders,
      }; }
      break;
    case 'PATCH': {
      let patchHeaders = {
        'Content-Type': 'application/json',
      };
      if (token) {
        patchHeaders = { ...patchHeaders, Authorization: `Bearer ${token}` };
      }
      options = {
        method,
        body: JSON.stringify(bodyContent),
        headers: patchHeaders,
      }; }
      break;
    default: {
      let defaultHeaders = {
        'Content-Type': 'application/json',
      };
      if (token) {
        defaultHeaders = { ...defaultHeaders, Authorization: `Bearer ${token}` };
      }

      options = {
        method,
        headers: defaultHeaders,
        body: JSON.stringify(bodyContent),
      }; }
      break;
  }

  return options;
};

const api = {
  getHomeData: () => new Promise((resolve) => {
    const options = requestOptions('GET', null, sessionStorage.getItem('session-token'));
    fetch(`${apiPath || 'http://localhost:3333'}/experiments`, options)
      .then(async (response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          resolve(response);
        }
        resolve({ response, data: data.data || data });
      })
      .catch((error) => {
        // don't return anything => execution goes the normal way
        console.error('There was an error!', error);
      });
  }),
  createExperiment: (name, description) => new Promise((resolve) => {
    const options = requestOptions('POST', { name, description }, sessionStorage.getItem('session-token'));
    fetch(`${apiPath || 'http://localhost:3333'}/experiments`, options)
      .then(async (response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          resolve(response);
        }
        resolve({ response, data: data.data || data });
      })
      .catch((error) => {
        // don't return anything => execution goes the normal way
        console.error('There was an error!', error);
      });
  }),
  deleteExperiment: (experimentId) => new Promise((resolve) => {
    const options = requestOptions('DELETE', { experimentId }, sessionStorage.getItem('session-token'));
    fetch(`${apiPath || 'http://localhost:3333'}/experiments`, options)
      .then(async (response) => {
        resolve(response);
      })
      .catch((error) => {
        // don't return anything => execution goes the normal way
        console.error('There was an error!', error);
      });
  }),
  resendVerificationEmail: (email) => new Promise((resolve) => {
    const options = requestOptions('POST', { email }, sessionStorage.getItem('session-token'));
    fetch(`${apiPath || 'http://localhost:3333'}/resend-email-verification`, options)
      .then(async (response) => {
        resolve(response);
      })
      .catch((error) => {
        // don't return anything => execution goes the normal way
        console.error('There was an error!', error);
      });
  }),
  resendExperimentToken: (experimentId) => new Promise((resolve) => {
    const options = requestOptions('POST', { experimentId }, sessionStorage.getItem('session-token'));
    fetch(`${apiPath || 'http://localhost:3333'}/resend-experiment-token`, options)
      .then(async (response) => {
        resolve(response);
      })
      .catch((error) => {
        // don't return anything => execution goes the normal way
        console.error('There was an error!', error);
      });
  }),
  createAccount: ({ email, name, password }) => new Promise((resolve) => {
    const options = requestOptions('POST', { name, email, password });
    fetch(`${apiPath || 'http://localhost:3333'}/create-user`, options)
      .then(async (response) => {
        resolve(response);
      })
      .catch((error) => {
        // don't return anything => execution goes the normal way
        console.error('There was an error!', error);
      });
  }),
  changePassword: ({ password, token }) => new Promise((resolve) => {
    console.log('token', token);
    console.log('password', password);
    const options = requestOptions('POST', { token, password });
    fetch(`${apiPath || 'http://localhost:3333'}/change-password`, options)
      .then(async (response) => {
        resolve(response);
      })
      .catch((error) => {
        // don't return anything => execution goes the normal way
        console.error('There was an error!', error);
      });
  }),
  recoverPassword: ({ email }) => new Promise((resolve) => {
    const options = requestOptions('POST', { email });
    fetch(`${apiPath || 'http://localhost:3333'}/recover-password`, options)
      .then(async (response) => {
        resolve(response);
      })
      .catch((error) => {
        // don't return anything => execution goes the normal way
        console.error('There was an error!', error);
      });
  }),
  getExperimentById: (id) => new Promise((resolve) => {
    const options = requestOptions('GET', null, sessionStorage.getItem('session-token'));
    fetch(`${apiPath || 'http://localhost:3333'}/get-data/${id}`, options)
      .then(async (response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          resolve(response);
        }
        resolve({ response, data: data.data || data });
      })
      .catch((error) => {
        // don't return anything => execution goes the normal way
        console.error('There was an error!', error);
      });
  }),
  getDataToExport: (id) => new Promise((resolve) => {
    const options = requestOptions('GET', null, sessionStorage.getItem('session-token'));
    fetch(`${apiPath || 'http://localhost:3333'}/experiment-to-export/${id}`, options)
      .then(async (response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          resolve(response);
        }
        resolve({ response, data: data.data || data });
      })
      .catch((error) => {
        // don't return anything => execution goes the normal way
        console.error('There was an error!', error);
      });
  }),
  login: (username, password) => new Promise((resolve) => {
    console.log(username, password);
    const options = requestOptions('POST', { email: username, password });
    fetch(`${apiPath || 'http://localhost:3333'}/login`, options)
      .then(async (response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();
        // check for error response
        if (!response.ok) {
          resolve(response);
        }
        sessionStorage.setItem('session-token', data.token);
        resolve({ ok: response.ok, data });
      })
      .catch((error) => {
        // don't return anything => execution goes the normal way
        console.error('There was an error!', error);
      });
  }),
  verifySession: () => new Promise((resolve) => {
    const options = requestOptions('POST', { token: sessionStorage.getItem('session-token') });
    fetch(`${apiPath || 'http://localhost:3333'}/session`, options)
      .then(async (response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = { error: (data && data.msg) || response.statusText || response.status };
          resolve(error);
        }
        resolve({ ok: response.ok, data });
      })
      .catch((error) => {
        // don't return anything => execution goes the normal way
        console.error('There was an error!', error);
      });
  }),
};

export { api, apiPath, requestOptions };
