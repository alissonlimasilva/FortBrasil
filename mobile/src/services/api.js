import axios from 'axios';
import { getLoggedUser } from '../utils/user';

const baseURL =
  'https://us-central1-fortbrasil-cd787.cloudfunctions.net/fortBrasil';

const apiNoAuth = axios.create({
  baseURL,
});

const apiAuth = axios.create({
  baseURL,
});

apiAuth.interceptors.request.use(async config => {
  const user = await getLoggedUser();
  config.headers.Authorization = user.token;
  return config;
});

export { apiAuth, apiNoAuth };
