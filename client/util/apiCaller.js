import fetch from 'isomorphic-fetch';
import Config from '../../server/config';
import { browserHistory } from 'react-router';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    if (response.status === 401) {
      localStorage.removeItem('authentication_token');
      browserHistory.push('/');
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
};

const parseJSON = (response) => {
  return response.json()
};

export default function callApi(endpoint, method = 'get', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + getAuthenticationToken()
    },
    method,
    body: JSON.stringify(body),
  }).then(checkStatus)
    .then(parseJSON)
    .catch((error) => {
      console.log('request failed', error);
      throw error;
    });
}

export const getAuthenticationToken = () => {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    return localStorage.authentication_token
  }
}

export const isLoggedIn = () => {
  return !!getAuthenticationToken();
}
