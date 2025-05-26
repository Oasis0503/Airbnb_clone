import config from './config.json'
import { RequestBody } from '@/interfaces'

interface FetchOptions {
  method: string;
  headers: {
    'Content-Type': string;
    Accept: string;
    Authorization?: string;
  };
  body?: string;
}

// Fetch requests with backend
export const newRequests = async <T extends RequestBody>(
  url: string,
  method: string,
  body?: T,
  token?: string | null,
) : Promise<T> => {
  const options: FetchOptions = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json' 
    }
  };
  
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`http://${config.BACKEND_HOST}:${config.BACKEND_PORT}${url}`, options);

  if (response.ok) {
    return response.json();
  } else {
    throw await response.json();
  }
}

// change image to base64
export const fileToDataUrl = async (file: Blob) => {
  if (file === undefined) throw Error('provided file is null.');

  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
  const valid = validFileTypes.find(type => type === file.type);
  if (!valid) {
    throw Error('provided file is not a png, jpg or jpeg image.')
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}

// format number such as 100000 => 100,000
export const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num);
}