import SearchSection from "./components/searchSection.js";
import ResultSection from "./components/resultSection.js";

import { api } from "./api/theCatAPI.js";

class App {
  constructor($target) {
    const searchSection = new SearchSection({
      $target,
      onClick: async () => {
        const response = await api.fetchRandomCats();

        if (!response.isError) {
          resultSection.setState(response.data);
        }
      },
    });

    const resultSection = new ResultSection({ $target });
  }
}

export default App;
