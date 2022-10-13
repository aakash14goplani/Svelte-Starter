import type { IFetchRequest } from "$src/types/types";

export function fetchData(input: Partial<IFetchRequest>): Promise<any> {
  if (input.url) {
    try {
      const URL = input.url;
      const options: any = {};
      options.method = input.method;
      if (input.headers) {
        options.header = {...input.headers};
      }
      if (input.body) {
        options.body = input.body;
      }
      if (input.options) {
        options.options = {...input.options};
      }
  
      return fetch(URL, options)
        .then((response: any) => {
          if (!response.ok) {
            return handleHttpError(response)
          }
  
          return response.json();
        })
        .catch((error: any) => handleHttpError(error))
    } catch(error) {
      return handleHttpError(error);
    }
  }

  return handleHttpError('Incorrect request call');
}

function handleHttpError(error: any) {
  return error.message || 'Error occured while fetching request: ' + JSON.stringify(error);
}
