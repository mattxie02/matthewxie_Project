import { FetchResult, Quote } from "./types";

const fetchLotrData = (url: string) => {
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${process.env.LOTR_TOKEN}`
  };
  return fetch(`https://the-one-api.dev/v2${url}`, {
    headers: headers,
  });
};

export const fetchItems = async <T>(url: string, limit = 10, page: number) => {
  const rawData = await fetchLotrData(`${url}?limit=${limit}&page=${page}`);
  const data: FetchResult<T> = await rawData.json();
  return data;
};

export const fetchItem = async <T>(url: string, id: string) => {
  const rawData = await fetchLotrData(`${url}/${id}`);
  const data: FetchResult<T> = await rawData.json();
  return data.docs[0];
};
