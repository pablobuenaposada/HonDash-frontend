class Bar {
  constructor(args) {
    var element = document.getElementById(args.id);
    this.width = element.offsetWidth;
    this.height = element.offsetHeight;
    this.isVertical = args.isVertical || false;
    this.minValue = args.minValue || 0;
    this.maxValue = args.maxValue || 100;
    this.enableTextValue =
      args.enableTextValue !== undefined ? args.enableTextValue : true;
    this.suffix = args.suffix !== undefined ? args.suffix : "";
    this.textFont = args.textFont || "Arial";
    this.textWeight = args.textWeight || "bold";
    this.textSize = this.height * 0.8;
    this.backgroundColor = args.backgroundColor || "#edebeb";
    this.sectors = [];
    this.decimals = args.decimals || 0;

    // Raphael paper object
    this.paper = Raphael(args.id);

    // Background
    this.background = this.paper.rect(0, 0, "100%", "100%");
    this.background.attr({
      fill: this.backgroundColor,
      stroke: this.backgroundColor,
    });

    // Bar fill & stroke
    this.bar = this.paper.rect(0, 0, "100%", "100%");
    this.bar.attr({
      fill: this.getFillColor(this.minValue),
      stroke: this.getFillColor(this.minValue),
    });

    // Center the text on the Bar
    this.text = this.paper.text(this.width / 2, this.height / 2, "");

    this.refresh(0);
  }

  getFillColor(value) {
    if (this.sectors.length > 0) {
      for (var i = 0; i < this.sectors.length; i++) {
        if (value >= this.sectors[i].lo && value <= this.sectors[i].hi) {
          return this.sectors[i].color;
        }
      }
    }
  }

  refresh(value) {
    value = parseFloat(value.toFixed(this.decimals));

    value =
      value > this.maxValue
        ? this.maxValue
        : value < this.minValue
          ? this.minValue
          : value;

    let color = this.getFillColor(value);

    if (this.isVertical) {
      const newWidth = (this.width * value) / this.maxValue;
      this.bar.animate(
        { width: newWidth, fill: color, stroke: color },
        100,
        "ease-in-out",
      );
    } else {
      const newHeight = (this.height * value) / this.maxValue;
      this.bar.animate(
        { height: newHeight, fill: color, stroke: color },
        100,
        "ease-in-out",
      );
    }

    if (this.enableTextValue) {
      this.text.attr({
        "font-family": this.textFont,
        "font-size": this.textSize,
        "font-weight": this.textWeight,
        text: value + this.suffix,
      });
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
    this.background.attr({
      fill: this.backgroundColor,
      stroke: this.backgroundColor,
    });
  }
}
