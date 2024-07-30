// type CustomConfig = RequestInit; // built-in RequestInit type for fetch configurations

async function client(
  endpoint: string,
  customConfig: RequestInit = {}
): Promise<any> {
  const config = {
    method: 'GET',
    ...customConfig,
  };

  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(async (response) => {
      const data: Promise<any> = await response.json();
      console.log(data);
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { client };
