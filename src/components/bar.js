class Bar {
  constructor(args) {
    var element = document.getElementById(args.id);
    this.x = args.x || 0;
    this.y = args.y || 0;
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
    this.textSize = args.textSize || 20;
    this.backgroundColor = args.backgroundColor || "#edebeb";
    this.sectors = args.sectors || [];
    this.decimals = args.decimals || 0;

    // Raphael paper object
    this.paper = Raphael(args.id);

    // Background
    this.background = this.paper.rect(this.x, this.y, this.width, this.height);
    this.background.attr({
      fill: this.backgroundColor,
      stroke: this.backgroundColor,
    });

    // Bar fill & stroke
    this.bar = this.paper.rect(this.x, this.y, this.width, this.height);
    this.bar.attr({
      fill: this.getFillColor(this.minValue),
      stroke: this.getFillColor(this.minValue),
    });

    // Center the text on the Bar
    this.text = this.paper.text(
      this.width / 2 + this.x,
      this.y + this.height / 2,
      "",
    );

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
      const newY = this.y - newHeight + this.height;
      this.bar.animate(
        { y: newY, height: newHeight, fill: color, stroke: color },
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
