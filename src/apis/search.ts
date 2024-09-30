import client from '.';

export const getUserInfoSearchPage = async () => {
  const { data } = await client.get(`/search`);
  return data;
};
