class Card {
  constructor({ $target, data }) {
    this.data = data;
    this.card = document.createElement("div");
    this.card.className = "cat-card";
    this.card.dataset.id = data.id;

    $target.appendChild(this.card);

    this.render();
  }

  render() {
    const { url } = this.data;
    const { name, origin } = this.data.breeds[0]
      ? this.data.breeds[0]
      : { name: "정보없음", origin: "정보없음" };

    // LazyLoading
    const catImage = document.createElement("img");
    catImage.className = "cat-image";
    catImage.classList.add("lazy");
    catImage.dataset.src = url;

    const cardInfo = document.createElement("article");
    cardInfo.className = "card-info";

    const catName = document.createElement("p");
    catName.className = "cat-name";
    catName.innerText = name;

    const catOrigin = document.createElement("p");
    catOrigin.className = "cat-origin";
    catOrigin.innerText = origin;

    // Append
    cardInfo.appendChild(catName);
    cardInfo.appendChild(catOrigin);
    this.card.appendChild(catImage);
    this.card.appendChild(cardInfo);
  }
}

export default Card;
