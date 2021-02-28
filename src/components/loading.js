class Loading {
  constructor({ $target }) {
    this.spinnerWrapper = document.createElement("div");
    this.spinnerWrapper.className = "spinner-wrapper";
    this.spinnerWrapper.classList.add("hidden");

    $target.appendChild(this.spinnerWrapper);

    this.render();
  }

  toggleSpinner() {
    const spinner = document.querySelector(".spinner-wrapper");
    spinner.classList.toggle("hidden");
  }

  render() {
    const content = document.createElement("div");
    content.innerText = "검색중입니다.";

    this.spinnerWrapper.appendChild(content);
  }
}

export default Loading;
