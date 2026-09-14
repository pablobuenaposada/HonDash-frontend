class Text {
  constructor(args) {
    this.element = document.getElementById(args.id);
    this.prefix = args.prefix || "";
    this.suffix = args.suffix || "";
    this.shadow = args.shadow || false;

    this.element.classList.add("text");
    this.element.innerHTML = this.prefix + (args.value || "-") + this.suffix;
    this.element.style.fontSize = args.size + "vw";
    this.element.style.fontFamily = args.font || "";
    this.element.style.fontWeight = args.weight || "bold";
    this.element.style.fontStyle = args.style || "";
    this.element.style.textAlign = args.textAlign || "";
  }

  refresh(value) {
    this.element.innerHTML = this.prefix + value + this.suffix;
  }

  setValue(value) {
    this.refresh(value);
  }

  setSuffix(suffix) {
    if (suffix != null) {
      this.suffix = suffix;
    }
  }

  setColor(color, shadow) {
    this.element.style.color = color;
    if (this.shadow) {
      this.element.style.textShadow = `4px 4px 0px ${shadow}`;
    }
  }
}
