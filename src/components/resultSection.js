import { lazyLoading } from "../utills/lazyloading.js";

class ResultSection {
  constructor({ $target }) {
    this.data = null;
    this.section = document.createElement("section");
    this.section.className = "result-section";

    $target.appendChild(this.section);
    this.render();
    lazyLoading();
  }

  setState(data) {
    this.data = data;
    this.render();
    lazyLoading();
  }

  render() {
    if (this.data === null) {
      return;
    }

    this.section.innerHTML = "";

    if (this.data.length > 0) {
      // 데이터 있음
      const cardContainer = document.createElement("div");
      cardContainer.className = "card-container";

      this.data.map((cat) => {
        const card = document.createElement("div");
        card.className = "cat-card";
        card.dataset.id = cat.id;

        const catImage = document.createElement("img");
        catImage.className = "cat-image";
        catImage.classList.add("lazy");
        catImage.dataset.src = cat.url;

        // Append
        card.appendChild(catImage);
        cardContainer.appendChild(card);
      });

      this.section.appendChild(cardContainer);
    } else {
      // 데이터 없음
    }
  }
}

export default ResultSection;
