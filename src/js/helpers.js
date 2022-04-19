import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = fetch(url, {
      method: uploadData ? 'POST' : 'GET',
      body: uploadData ? uploadData : undefined,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
