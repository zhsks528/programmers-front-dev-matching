import SearchSection from "./components/searchSection.js";
import ResultSection from "./components/resultSection.js";
import Loading from "./components/loading.js";
import Modal from "./components/modal.js";
import Error from "./components/error.js";

import { api } from "./api/theCatAPI.js";
import { getItem, setItem } from "./utills/sessionStorage.js";

class App {
  constructor($target) {
    const keywords = getItem("keywords");
    const data = getItem("data");
    const searchSection = new SearchSection({
      $target,
      keywords,
      onRandom: async () => {
        loading.toggleSpinner();
        const response = await api.fetchRandomCats();

        if (!response.isError) {
          resultSection.setState(response.data);
          setItem("data", response.data);
          loading.toggleSpinner();
        } else {
          error.setState(response.data);
        }
      },
      onSearch: async (keyword) => {
        loading.toggleSpinner();
        const response = await api.fetchKeywordCats(keyword);

        if (!response.isError) {
          resultSection.setState(response.data);
          setItem("data", response.data);
          loading.toggleSpinner();
        } else {
          error.setState(response.data);
        }
      },
    });

    const resultSection = new ResultSection({
      $target,
      data,
      onClick: (data) => {
        modal.setState(data);
      },
      onScroll: async () => {},
    });

    const loading = new Loading({ $target });

    const modal = new Modal({ $target });

    const error = new Error({ $target });
  }
}

export default App;
