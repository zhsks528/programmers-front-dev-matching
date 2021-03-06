import { debounce } from "../utills/debounce.js";
import { setItem } from "../utills/sessionStorage.js";
import { applySetting } from "../utills/darkmode.js";
class SearchSection {
  constructor({ $target, keywords, onRandom, onSearch }) {
    this.keywords = keywords;
    this.onRandom = onRandom;
    this.onSearch = onSearch;
    this.section = document.createElement("section");
    this.section.className = "search-section";

    $target.appendChild(this.section);

    this.render();
    this.initialFocus();
    applySetting();
  }

  initialFocus() {
    const searchInput = document.querySelector(".search-input");
    searchInput.focus();
  }

  deleteKeyword() {
    const searchInput = document.querySelector(".search-input");
    searchInput.value = "";
  }

  addRecentKeyword(keyword) {
    if (this.keywords.includes(keyword)) return;
    if (this.keywords.length === 5) {
      this.keywords.shift();
    }
    this.keywords.push(keyword);
    setItem("keywords", this.keywords);
    this.render();
  }

  searchByKeyword(keyword) {
    this.onSearch(keyword);
    this.addRecentKeyword(keyword);
  }

  findKeyword(pkeyword) {
    return this.keywords.find((keyword) => keyword === pkeyword);
  }

  render() {
    this.section.innerHTML = "";

    // HTML
    const searchWrapper = document.createElement("div");
    searchWrapper.className = "search-wrapper";

    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container";

    const searchInput = document.createElement("input");
    searchInput.className = "search-input";
    searchInput.placeholder = "검색어를 입력해주세요.";

    const searchRandomBtn = document.createElement("button");
    searchRandomBtn.innerText = "랜덤 검색";

    const darkmodeBtn = document.createElement("input");
    darkmodeBtn.className = ".darkmode-btn";
    darkmodeBtn.type = "checkbox";

    const keywordsContainer = document.createElement("div");
    keywordsContainer.className = "keywords-container";

    this.keywords.map((keyword) => {
      const recentKeyword = document.createElement("div");
      recentKeyword.className = "recent-keyword";
      recentKeyword.innerText = keyword;
      recentKeyword.dataset.keyword = keyword;

      keywordsContainer.appendChild(recentKeyword);
    });

    // Listener
    // (Event-delegation)
    keywordsContainer.addEventListener("click", (event) => {
      const pkeyword = event.target.dataset.keyword;

      const keyword = this.findKeyword(pkeyword);

      if (keyword) {
        this.onSearch(keyword);
      }
    });

    searchRandomBtn.addEventListener("click", this.onRandom);
    searchInput.addEventListener("focus", this.deleteKeyword);
    searchInput.addEventListener(
      "keyup",
      debounce((event) => {
        if (event.key == "Enter") {
          this.searchByKeyword(searchInput.value);
        }
      }, 1000)
    );

    darkmodeBtn.addEventListener("click", (event) => {
      if (event.target.checked) {
        localStorage.setItem("color-theme", "light");
        document.documentElement.setAttribute("color-theme", "dark");
      } else {
        localStorage.setItem("color-theme", "light");
        document.documentElement.setAttribute("color-theme", "light");
      }
    });

    // Append
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchRandomBtn);
    searchContainer.appendChild(darkmodeBtn);

    searchWrapper.appendChild(searchContainer);
    searchWrapper.appendChild(keywordsContainer);

    this.section.appendChild(searchWrapper);
  }
}

export default SearchSection;
