const API_ENDPOINT = "https://api.thecatapi.com/v1";

const request = async (url) => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = response.json();

      return data;
    } else {
      const erroData = response.json();

      throw erroData;
    }
  } catch (e) {
    return e;
  }
};

const api = {
  // 20개를 랜덤으로 가져옵니다.
  fetchRandomCats: async () => {
    try {
      const response = await request(`${API_ENDPOINT}/images/search?limit=20`);

      return {
        isError: false,
        data: response,
      };
    } catch (e) {}
  },
};

export { api };
