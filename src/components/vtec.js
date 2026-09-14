class Vtec {
  constructor(args) {
    this.element = document.getElementById(args.id);
    this.pathOff = "vtec_off.svg";
    this.pathOn = "vtec_on.svg";
    this.pathMalfunction = "vtec_malfunction.svg";
    this.img = document.createElement("img");
    this.img.className = "icon icon--off";
    this.img.style.width = "80%";
    this.img.src = "icons/" + this.pathOff;
    this.element.appendChild(this.img);
  }

  refresh(value) {
    if (value == "on") {
      this.img.src = "icons/" + this.pathOn;
    } else if (value == "malfunction") {
      this.img.src = "icons/" + this.pathMalfunction;
    } else {
      this.img.src = "icons/" + this.pathOff;
    }
    this.img.classList.toggle("icon--on", value != "off");
    this.img.classList.toggle("icon--off", value == "off");
  }
}
