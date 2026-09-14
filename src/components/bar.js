class Bar {
  constructor(args) {
    this.element = document.getElementById(args.id);
    this.isVertical = args.isVertical || false; // true -> grows to the right
    this.minValue = args.minValue || 0;
    this.maxValue = args.maxValue || 100;
    this.enableTextValue =
      args.enableTextValue !== undefined ? args.enableTextValue : true;
    this.suffix = args.suffix !== undefined ? args.suffix : "";
    this.textFont = args.textFont || "";
    this.textWeight = args.textWeight || "bold";
    this.textScale = args.textScale || 0.8; // portion of the bar height
    this.highlightTopSector = args.highlightTopSector || false;
    this.backgroundColor = args.backgroundColor || "#edebeb";
    this.sectors = [];
    this.decimals = args.decimals || 0;

    this.element.classList.add("bar");
    this.element.classList.toggle("bar--upright", !this.isVertical);
    this.element.innerHTML = "";

    // the value is drawn twice, once under the fill and once clipped inside it,
    // so every digit contrasts with whatever is behind it
    this.text = this.buildText();
    this.element.appendChild(this.text);

    this.fill = document.createElement("div");
    this.fill.className = "bar__fill";
    this.filledText = this.buildText();
    this.fill.appendChild(this.filledText);
    this.element.appendChild(this.fill);

    this.setBackgroundColor(this.backgroundColor);

    // the text has to stay proportional to the bar whatever its size is
    this.scaleText();
    if (window.ResizeObserver !== undefined) {
      new ResizeObserver(() => this.scaleText()).observe(this.element);
    } else {
      window.addEventListener("resize", () => this.scaleText());
    }

    this.refresh(0);
  }

  buildText() {
    const text = document.createElement("div");
    text.className = "bar__text";
    text.style.fontFamily = this.textFont;
    text.style.fontWeight = this.textWeight;
    return text;
  }

  scaleText() {
    const width = this.element.offsetWidth;
    const height = this.element.offsetHeight;
    [this.text, this.filledText].forEach((text) => {
      text.style.fontSize = height * this.textScale + "px";
      // the clipped copy has to keep the size of the whole bar to stay aligned
      text.style.width = width + "px";
      text.style.height = height + "px";
    });
  }

  getFillColor(value) {
    for (var i = 0; i < this.sectors.length; i++) {
      if (value >= this.sectors[i].lo && value <= this.sectors[i].hi) {
        return this.sectors[i].color;
      }
    }
    return null;
  }

  // last sector of the scale, the redline on a rpm bar
  isOnTopSector(value) {
    if (this.sectors.length < 2) {
      return false;
    }
    const top = this.sectors.reduce((a, b) => (a.hi > b.hi ? a : b));
    return value >= top.lo && value <= top.hi;
  }

  refresh(value) {
    value = parseFloat(value.toFixed(this.decimals));

    value =
      value > this.maxValue
        ? this.maxValue
        : value < this.minValue
          ? this.minValue
          : value;

    const span = this.maxValue - this.minValue || 1;
    const percentage = ((value - this.minValue) * 100) / span;
    this.fill.style[this.isVertical ? "width" : "height"] = percentage + "%";

    const color = this.getFillColor(value);
    if (color !== null) {
      this.fill.style.backgroundColor = color;
      this.filledText.style.color = contrastingColor(color);
      this.element.style.setProperty("--bar-color", color);
    }

    this.element.classList.toggle(
      "bar--alert",
      this.highlightTopSector && this.isOnTopSector(value),
    );

    if (this.enableTextValue) {
      this.text.textContent = value + this.suffix;
      this.filledText.textContent = value + this.suffix;
    }
  }

  setDecimals(decimals) {
    this.decimals = decimals;
  }

  setMax(max) {
    this.maxValue = max;
  }

  setSectors(sectors) {
    this.sectors = sectors;
  }

  setSuffix(suffix) {
    this.suffix = suffix;
  }

  setBackgroundColor(color) {
    this.backgroundColor = color;
    this.element.style.backgroundColor = color;
    // the value needs to be visible on whatever track color the setup picks
    const readable = contrastingColor(color);
    this.text.style.color = readable;
    this.element.style.setProperty("--bar-ink-rgb", rgbChannels(readable));
  }
}
