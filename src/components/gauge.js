class Gauge {
  constructor(args) {
    this.element = document.getElementById(args.id);

    const fontSize = Math.min(
      this.element.offsetWidth,
      this.element.offsetHeight,
    );

    this.valueElement = document.createElement("span");
    this.valueElement.style.fontSize = "5em";
    this.valueElement.innerHTML = "-";
    this.element.appendChild(this.valueElement);

    this.labelElement = document.createElement("span");
    this.labelElement.style.fontSize = "1.3em";
    this.labelElement.innerHTML = args.id.toUpperCase();
    this.labelElement.style.position = "absolute";
    this.labelElement.style.bottom = "0px";

    this.element.appendChild(this.labelElement);

    this.decimals = 0;
    this.sectors = [];
    this.useTarget = false;
  }

  refresh(value, target = null) {
    const formattedValue = value.toFixed(this.decimals);
    this.valueElement.innerHTML = formattedValue;
    this.updateBackground(value, target);

    const digitCount = this.countNumDigits(formattedValue);
    let fontSize;
    if (digitCount >= 7) {
      fontSize = 2;
    } else if (digitCount === 6 || digitCount === 5) {
      fontSize = 2.8;
    } else if (digitCount === 4) {
      fontSize = 3.3;
    } else if (digitCount === 3) {
      fontSize = 4;
    } else {
      fontSize = 4.2;
    }
    this.valueElement.style.fontSize = `${fontSize}em`;
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
    this.element.style.border = `1px solid ${color}`;
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

    if (currentSector) {
      this.element.style.backgroundColor = currentSector.color;
    } else {
      this.element.style.backgroundColor = "transparent";
    }
  }
}
