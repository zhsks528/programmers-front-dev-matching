import Card from "./card.js";
import { lazyLoading } from "../utills/lazyloading.js";

class ResultSection {
  constructor({ $target, data, onClick }) {
    this.data = data;
    this.onClick = onClick;
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

  findCatById(id) {
    return this.data.find((cat) => cat.id === id);
  }

  render() {
    if (!this.data) return;

    this.section.innerHTML = "";

    if (this.data.length > 0) {
      // 데이터 있음
      const cardContainer = document.createElement("div");
      cardContainer.className = "card-container";

      this.data.map((cat) => {
        new Card({
          $target: cardContainer,
          data: cat,
        });
      });

      // Listener (Event-delegation)
      cardContainer.addEventListener("click", (event) => {
        const path = event.path;
        const card = path.find((x) => x.className === "cat-card");

        if (card) {
          const id = card.dataset.id;
          const cardInfo = this.findCatById(id);

          this.onClick(cardInfo);
        }
      });

      this.section.appendChild(cardContainer);
    } else {
      // 데이터 없음
      const noDataContainer = document.createElement("div");
      noDataContainer.className = "nodata-container";

      const content = document.createElement("article");
      content.innerText = "검색 결과가 없습니다.";

      noDataContainer.appendChild(content);

      this.section.appendChild(noDataContainer);
    }
  }
}

export default ResultSection;
