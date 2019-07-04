import { ajax  } from 'rxjs/ajax';
import { map, retry } from 'rxjs/operators';
import {
  BASE_URL,
  API_KEY
} from '../app.config';

const options = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
};

export const get = (endpoint) => {
  return ajax.getJSON(BASE_URL + endpoint, options).pipe(
    map(results => results)
  )
}

export const post = (endpoint, data, timeoutArg, retryCountArg) => {
  const timeout = (timeoutArg !== undefined) ? timeoutArg : 2000
  const retryCount = (retryCountArg !== undefined) ? retryCountArg : 15

  return ajax({
    url: BASE_URL + endpoint,
    method: 'POST',
    headers: options,
    body: data,
    timeout: timeout,
  }).pipe(retry(retryCount));
}

var subscriptions = {};
export const request = (name, endpoint, data, observer) => {

  if(subscriptions[name] !== undefined){
    subscriptions[name].unsubscribe()
  }

  const emitter = post(endpoint,data)

  subscriptions[name] = emitter.subscribe(observer)

}

