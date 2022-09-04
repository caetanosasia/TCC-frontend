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
    const options = requestOptions('GET');
    fetch(`${apiPath || 'http://localhost:3333'}/get-data`, options)
      .then(async (response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = { error: (data && data.msg) || response.statusText || response.status };
          resolve(error);
        }
        resolve(data.data || data);
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
        console.log('response! ', response);
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = { error: (data && data.msg) || response.statusText || response.status };
          resolve(error);
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
