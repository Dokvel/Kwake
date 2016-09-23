import fetch from 'isomorphic-fetch';
import Config from '../../server/config';
import { browserHistory } from 'react-router';

function generateApiUrl(relativePath) {
  return (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/${relativePath}`) : `/${relativePath}`;
}

export const API_URL = generateApiUrl('api');
export const ADMIN_API_URL = generateApiUrl('admin/api');

const checkStatus = (response, unauthorizedCallback) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    if (typeof window !== 'undefined' && response.status === 401) {
      unauthorizedCallback();
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error
    }
    return Promise.reject(response);
  }
};

const parseJSON = (response) => {
  if (response && response.json) {
    return response.json();
  } else {
    var error = new Error('Response not contain JSON');
    throw error
  }
};

function fetchWrapper(url, requestOptions, unauthorizedCallback) {
  return fetch(url, requestOptions)
    .then((response)=> {
      return checkStatus(response, unauthorizedCallback);
    })
    .then(parseJSON)
    .catch((error) => {
      console.log('request failed', error);
      throw error;
    });
}

export default function callApi(endpoint, method = 'get', body) {
  let requestOptions = {
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + getAuthenticationToken()
    },
    method,
    body: JSON.stringify(body),
  };

  const unauthorizedCallback = () => {
    localStorage.removeItem('authentication_token');
    window.flashMessage = {
      title: 'Authentication error',
      text: 'You need to re-login in app for renew Google access, thank you.'
    };
    browserHistory.push('/');
  };

  return fetchWrapper(`${API_URL}/${endpoint}`, requestOptions, unauthorizedCallback);
}

export function callAdminApi(endpoint, method = 'get', body) {
  let requestOptions = {
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include',
    method,
    body: JSON.stringify(body),
  };

  const unauthorizedCallback = () => {
    browserHistory.push('/admin');
  };

  return fetchWrapper(`${ADMIN_API_URL}/${endpoint}`, requestOptions, unauthorizedCallback);
}

export const getAuthenticationToken = () => {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    return localStorage.authentication_token
  }
};

export const isLoggedIn = () => {
  return !!getAuthenticationToken();
};
