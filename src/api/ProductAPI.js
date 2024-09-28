import axios from 'axios';
import Config from 'react-native-config';
import * as PAPI from './Constants/APIEndpoints';

function getProductscategory() {
  var url = Config.BASE_URL + PAPI.categories;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        var result = '';
        switch (response.status) {
          case 200:
            if (response.data !== null && response.data !== undefined) {
              result = {
                status: response.status,
                data: response.data,
              };
            }

            break;
          case 500:
            result = {
              status: response.status,
              data: [],
              message: 'Server Error',
            };
            break;
          case 404:
            result = {
              status: response.status,
              data: [],
              message: 'Groups not Found',
            };
            break;
          default:
            result = {
              status: response.status,
              data: [],
              message: 'unhandled',
            };
            break;
        }

        resolve(result);
      })
      .catch(err => {
        let result = {
          status: 404,
          message: 'Not Matched',
        };
        resolve(result);
        console.log('error in fetching products category', err);
      });
  });
}

function getProductsSubcategory({parentId}) {
  var url = Config.BASE_URL + PAPI.subcategory + `?parentId=${parentId}`;
  console.log('url for subcategory', url);
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        var result = '';
        switch (response.status) {
          case 200:
            if (response.data !== null && response.data !== undefined) {
              result = {
                status: response.status,
                data: response.data,
              };
            }

            break;
          case 500:
            result = {
              status: response.status,
              data: [],
              message: 'Server Error',
            };
            break;
          case 404:
            result = {
              status: response.status,
              data: [],
              message: 'Groups not Found',
            };
            break;
          default:
            result = {
              status: response.status,
              data: [],
              message: 'unhandled',
            };
            break;
        }

        resolve(result);
      })
      .catch(err => {
        let result = {
          status: 404,
          message: 'Not Matched',
        };
        resolve(result);
      });
  });
}

function getProductsDataBycategory({subId}) {
  var url = Config.BASE_URL + PAPI.categorydata + `?subId=${subId}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        var result = '';
        switch (response.status) {
          case 200:
            if (response.data !== null && response.data !== undefined) {
              result = {
                status: response.status,
                data: response.data,
              };
            }

            break;
          case 500:
            result = {
              status: response.status,
              data: [],
              message: 'Server Error',
            };
            break;
          case 404:
            result = {
              status: response.status,
              data: [],
              message: 'Groups not Found',
            };
            break;
          default:
            result = {
              status: response.status,
              data: [],
              message: 'unhandled',
            };
            break;
        }

        resolve(result);
      })
      .catch(err => {
        let result = {
          status: 404,
          message: 'Not Matched',
        };
        resolve(result);
      });
  });
}

export const ProductAPI = {
  getProductscategory,
  getProductsSubcategory,
  getProductsDataBycategory,
};
