import { debounce } from "../utills/debounce.js";

class SearchSection {
  constructor({ $target, onClick, onSearch }) {
    this.onClick = onClick;
    this.onSearch = onSearch;
    this.section = document.createElement("section");
    this.section.className = "search-section";

    $target.appendChild(this.section);

    this.render();
  }

  searchByKeyword(keyword) {
    this.onSearch(keyword);
  }

  render() {
    this.section.innerHTML = "";

    // Html
    const searchWrapper = document.createElement("div");
    searchWrapper.className = "search-wrapper";

    const searchBox = document.createElement("input");
    searchBox.placeholder = "검색어를 입력해주세요.";
    const randomBtn = document.createElement("button");
    randomBtn.innerText = "랜덤 검색";

    // Listener
    randomBtn.addEventListener("click", this.onClick);
    searchBox.addEventListener(
      "keyup",
      debounce(() => {
        const keyword = searchBox.value;

        this.searchByKeyword(keyword);
      }, 1000)
    );

    // Append
    searchWrapper.appendChild(searchBox);
    searchWrapper.appendChild(randomBtn);

    this.section.appendChild(searchWrapper);
  }
}

export default SearchSection;
