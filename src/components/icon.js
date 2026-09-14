class Icon {
  constructor(args) {
    this.element = document.getElementById(args.id);
    this.pathOff = "";
    this.pathOn = "";
    this.height = args.height || "80%";
    this.img = document.createElement("img");
    this.img.className = "icon icon--off";
    this.img.style.height = this.height;
    this.element.appendChild(this.img);
  }

  refresh(value) {
    const on = value > 0;
    // same node all the time so switching state does not make the icon blink
    this.img.src = "icons/" + (on ? this.pathOn : this.pathOff);
    this.img.classList.toggle("icon--on", on);
    this.img.classList.toggle("icon--off", !on);
  }

  setPathoff(path) {
    this.pathOff = path;
    if (!this.img.getAttribute("src")) {
      this.img.src = "icons/" + this.pathOff;
    }
  }

  setPathon(path) {
    this.pathOn = path;
  }
}
