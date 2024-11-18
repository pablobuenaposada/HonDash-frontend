class Icon {
  constructor(args) {
    this.element = document.getElementById(args.id);
    this.pathOff = "";
    this.pathOn = "";
    this.height = args.height || "80%";
    var img = document.createElement("img");
    img.src = "icons/" + this.pathOff;
    img.style.height = this.height;
    this.element.appendChild(img);
  }

  refresh(value) {
    var img = document.createElement("img");
    img.style.height = this.height;
    img.src = "icons/" + (value > 0 ? this.pathOn : this.pathOff);
    this.element.innerHTML = "";
    this.element.appendChild(img);
  }

  setPathoff(path) {
    this.pathOff = path;
  }

  setPathon(path) {
    this.pathOn = path;
  }
}
