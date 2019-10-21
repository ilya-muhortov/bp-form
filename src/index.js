import axios from 'axios';

export { DebouncedInputWidget } from './Debounced';
export { InputWidget } from './Input';
export { NumberInputWidget } from './Number';
export { SelectWidget } from './Select';
export { TextWidget } from './Text';
export { UploadButton } from './UploadButton';

export * from './async';
export * from './context';
export * from './dialog';

axios.defaults.baseURL = process.env.REACT_APP_API_HOST ? `${process.env.REACT_APP_API_HOST}` : '';
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  if (config.url[0] !== '/') {
    config.url = `/api/${config.url}`;
  }

  if (config.url[config.url.length - 1] !== '/' && config.url.indexOf('?') === -1) {
    config.url += '/';
  }

  console.log(config.url);
  return config;
});
