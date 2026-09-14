class Style {
  constructor(args) {
    this.dayBackgroundColor = "white";
    this.dayTextColor = "black";
    this.dayBackgroundGaugeColor = "#edebeb";
    this.nightBackgroundColor = "black";
    this.nightTextColor = "white";
    this.nightBackgroundGaugeColor = "#edebeb";
    this.currentStyle = "day";
  }

  refresh(value, force = false) {
    if (this.currentStyle == value && force == false) {
      return;
    }
    if (value != "night" && value != "day") {
      return;
    }

    this.currentStyle = value;
    const backgroundColor =
      value == "night" ? this.nightBackgroundColor : this.dayBackgroundColor;
    const textColor =
      value == "night" ? this.nightTextColor : this.dayTextColor;
    const gaugeColor =
      value == "night"
        ? this.nightBackgroundGaugeColor
        : this.dayBackgroundGaugeColor;

    // the stylesheet takes care of the decoration (borders, dimmed icons...)
    // out of these, so it always matches the colors coming from the setup
    document.body.dataset.theme = value;
    document.documentElement.style.setProperty("--bg", backgroundColor);
    document.documentElement.style.setProperty(
      "--bg-rgb",
      rgbChannels(backgroundColor),
    );
    document.documentElement.style.setProperty("--fg", textColor);
    document.documentElement.style.setProperty(
      "--fg-rgb",
      rgbChannels(textColor),
    );
    document.body.style.backgroundColor = backgroundColor;

    for (var name in window) {
      try {
        if (window[name].constructor.name == "Text") {
          window[name].setColor(textColor, gaugeColor);
        } else if (window[name].constructor.name == "Gauge") {
          window[name].setTextColor(textColor);
          window[name].setBackgroundColor(textColor);
        } else if (window[name].constructor.name == "Bar") {
          window[name].setBackgroundColor(gaugeColor);
        }
      } catch (error) {}
    }
  }

  setDayBackgroundColor(color) {
    this.dayBackgroundColor = color;
    this.refresh(this.currentStyle, true);
  }

  setNightBackgroundColor(color) {
    this.nightBackgroundColor = color;
    this.refresh(this.currentStyle, true);
  }

  setDayTextColor(color) {
    this.dayTextColor = color;
    this.refresh(this.currentStyle, true);
  }

  setNightTextColor(color) {
    this.nightTextColor = color;
    this.refresh(this.currentStyle, true);
  }

  setDayBackgroundGaugeColor(color) {
    this.dayBackgroundGaugeColor = color;
    this.refresh(this.currentStyle, true);
  }

  setNightBackgroundGaugeColor(color) {
    this.nightBackgroundGaugeColor = color;
    this.refresh(this.currentStyle, true);
  }
}
