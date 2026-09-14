class Gauge {
  constructor(args) {
    this.element = document.getElementById(args.id);
    this.element.classList.add("gauge");

    this.valueElement = document.createElement("span");
    this.valueElement.className = "gauge__value";
    this.valueElement.innerHTML = "-";
    this.element.appendChild(this.valueElement);

    this.labelElement = document.createElement("span");
    this.labelElement.className = "gauge__label";
    this.labelElement.innerHTML = args.id.toUpperCase();
    this.element.appendChild(this.labelElement);

    this.decimals = 0;
    this.sectors = [];
    this.useTarget = false;
    this.valueScale = Gauge.scaleForDigits(1);

    // everything is sized from the gauge height so it fits on any screen
    this.scale();
    if (window.ResizeObserver !== undefined) {
      new ResizeObserver(() => this.scale()).observe(this.element);
    } else {
      window.addEventListener("resize", () => this.scale());
    }
  }

  // portion of the gauge height taken by the value, the more digits the smaller
  static scaleForDigits(digitCount) {
    if (digitCount >= 7) {
      return 0.24;
    } else if (digitCount >= 5) {
      return 0.34;
    } else if (digitCount === 4) {
      return 0.4;
    } else if (digitCount === 3) {
      return 0.48;
    }
    return 0.51;
  }

  scale() {
    const height = this.element.offsetHeight;
    this.valueElement.style.fontSize = height * this.valueScale + "px";
    this.labelElement.style.fontSize = Math.max(10, height * 0.16) + "px";
  }

  refresh(value, target = null) {
    const formattedValue = value.toFixed(this.decimals);
    this.valueElement.innerHTML = formattedValue;
    this.updateBackground(value, target);

    this.valueScale = Gauge.scaleForDigits(this.countNumDigits(formattedValue));
    this.scale();
  }

  setSectors(sectors) {
    this.sectors = sectors;
  }

  setLabel(label) {
    this.labelElement.innerHTML = label;
  }

  setDecimals(decimals) {
    this.decimals = decimals;
  }

  setTextColor(color) {
    this.valueElement.style.color = color;
    this.labelElement.style.color = color;
  }

  setTarget(value) {
    this.useTarget = value;
  }

  setBackgroundColor(color) {
    this.element.style.setProperty("--gauge-line-rgb", rgbChannels(color));
  }

  countNumDigits(value) {
    let count = value.replace(".", "").replace("-", "").length;
    if (value.startsWith("-")) {
      count++;
    }
    return count;
  }

  updateBackground(value, targetValue = null) {
    if (!this.sectors.length) return;

    if (this.useTarget) {
      value = value - targetValue;
    }

    const currentSector = this.sectors.find(
      (sector) => value >= sector.lo && value <= sector.hi,
    );
    // a see-through sector color means "nothing to report", plain gauge then
    const color =
      currentSector !== undefined && colorToRgb(currentSector.color) !== null
        ? currentSector.color
        : null;

    if (color === null) {
      this.element.style.removeProperty("--gauge-bg");
      this.element.style.removeProperty("--gauge-line-alert-rgb");
      this.element.classList.remove("gauge--alert");
    } else {
      this.element.style.setProperty("--gauge-bg", color);
      this.element.style.setProperty(
        "--gauge-line-alert-rgb",
        rgbChannels(shadeColor(color, isDarkColor(color) ? 0.35 : -0.35)),
      );
      this.element.classList.add("gauge--alert");
    }
  }
}
