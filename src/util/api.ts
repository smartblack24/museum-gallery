import axios from 'axios';

const baseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1'

const api = axios.create({
  baseURL: baseUrl
});

export const fetchProductApi = async (productId: number) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data } = await api.get(`/objects/${productId}`);
    return data;
  } catch (err) {
    throw err
  }
}

export const fetchProductIdsApi = async (query: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data } = await api.get(`/search?q=${query}`);

    if (data.total > 0) {
      const getAllProducts: any[] = [];
      data.objectIDs.forEach((id: number) => {
        getAllProducts.push(fetchProductApi(id));
      });

      const products = Promise.all(getAllProducts);
      return products;
    }

    return [];
  } catch (err) {
    throw err
  }
}

