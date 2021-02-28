class Modal {
  constructor({ $target }) {
    this.isVisible = false;
    this.data = null;
    this.modalWrapper = document.createElement("div");
    this.modalWrapper.className = "modal-wrapper";
    this.modalWrapper.classList.add("hidden");

    $target.appendChild(this.modalWrapper);

    this.render();
  }

  toggleModal() {
    this.isVisible = !this.isVisible;
    console.log(this.isVisible);
    const modal = document.querySelector(".modal-wrapper");
    modal.classList.toggle("hidden");
  }

  setState(data) {
    this.toggleModal();
    this.data = data;
    this.render();
  }

  onClose() {
    console.log(this);

    this.toggleModal();
    this.data = null;
    this.modalWrapper.innerHTML = "";
  }

  render() {
    if (!this.isVisible) return;

    // HTML
    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const modal = document.createElement("div");
    modal.className = "modal";

    const modalHeader = document.createElement("div");

    const modalTitle = document.createElement("h3");
    modalTitle.innerText = "제목";

    const closeBtn = document.createElement("button");
    closeBtn.innerText = "X";

    const modalImage = document.createElement("img");
    modalImage.className = "modal-catImage";
    modalImage.src = this.data.url;

    const modalInfo = document.createElement("div");

    const catPersonality = document.createElement("div");
    catPersonality.innerText = "성격 정보";

    const catBorn = document.createElement("div");
    catBorn.innerText = "태생 정보";

    // Listener
    overlay.addEventListener("click", () => {
      this.onClose();
    });
    closeBtn.addEventListener("click", () => {
      this.onClose();
    });

    // Appen
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeBtn);

    modalInfo.appendChild(catPersonality);
    modalInfo.appendChild(catBorn);

    modal.appendChild(modalHeader);
    modal.appendChild(modalImage);
    modal.appendChild(modalInfo);

    overlay.appendChild(modal);

    this.modalWrapper.appendChild(overlay);
  }
}

export default Modal;
