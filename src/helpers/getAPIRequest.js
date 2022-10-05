const URL = 'https://economia.awesomeapi.com.br/json/all';

const getAPIRequest = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  delete data.USDT;
  // console.log(data);
  return data;
};

export default getAPIRequest;
