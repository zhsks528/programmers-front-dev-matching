const API_ENDPOINT = "https://api.thecatapi.com/v1";

const request = async (url) => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      const erroData = await response.json();
      throw erroData;
    }
  } catch (e) {
    throw {
      message: e.message,
      status: e.status,
    };
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
    } catch (e) {
      return {
        isError: true,
        data: e,
      };
    }
  },

  // 키워드를 이용한 검색
  fetchKeywordCats: async (keyword) => {
    try {
      const breeds = await request(
        `${API_ENDPOINT}/breeds/search?q=${keyword}`
      );
      const requests = breeds.map(async (breed) => {
        return await request(
          `${API_ENDPOINT}/images/search?limit=20&breed_ids=${breed.id}`
        );
      });
      const results = await Promise.all(requests);
      const response = Array.prototype.concat.apply([], results);

      return {
        isError: false,
        data: response,
      };
    } catch (e) {
      return {
        isError: true,
        data: e,
      };
    }
  },
};

export { api };
