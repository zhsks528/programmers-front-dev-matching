import SearchSection from "./components/searchSection.js";
import ResultSection from "./components/resultSection.js";
import Loading from "./components/loading.js";

import { api } from "./api/theCatAPI.js";

class App {
  constructor($target) {
    const searchSection = new SearchSection({
      $target,
      onClick: async () => {
        loading.toggleSpinner();
        const response = await api.fetchRandomCats();

        if (!response.isError) {
          resultSection.setState(response.data);
          loading.toggleSpinner();
        }
      },
      onSearch: async (keyword) => {
        loading.toggleSpinner();
        const response = await api.fetchKeywordCats(keyword);

        if (!response.isError) {
          resultSection.setState(response.data);
          loading.toggleSpinner();
        }
      },
    });

    const resultSection = new ResultSection({ $target });

    const loading = new Loading({ $target });
  }
}

export default App;
