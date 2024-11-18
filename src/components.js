// Bars
var bar1 = new Bar({ id: "bar1", isVertical: true, textSize: 60 });
var bar2 = new Bar({ id: "bar2", isVertical: true, textSize: 30 });
var bar3 = new Bar({ id: "bar3", isVertical: true, textSize: 20 });

// Text and numbers
var speed = new Text({
  id: "speed",
  size: 16,
  style: "italic",
  textAlign: "center",
  shadow: true,
});
var gear = new Text({ id: "gear", textAlign: "center", size: 16 });
var time = new Text({
  id: "time",
  value: "00:00:00",
  size: 3,
  style: "italic",
  textAlign: "center",
});
var odo = new Text({
  id: "odo",
  value: "0",
  size: 3,
  style: "italic",
  textAlign: "center",
});
var version = new Text({
  id: "version",
  value: "",
  size: 1,
  style: "italic",
  prefix: "HonDash v ",
  textAlign: "right",
});
var ecu_name = new Text({
  id: "ecu_name",
  value: "",
  size: 1,
  style: "italic",
  textAlign: "right",
  suffix: " v",
});
var firmware_version = new Text({
  id: "firmware_version",
  value: "",
  size: 1,
  style: "italic",
});
var gear_label = new Text({
  id: "gear-label",
  value: "GEAR",
  size: 2.5,
  textAlign: "center",
});

// Icons
var icon1 = new Icon({ id: "icon1", height: "60%" });
var icon2 = new Icon({ id: "icon2", height: "70%" });
var icon3 = new Icon({ id: "icon3" });
var icon4 = new Vtec({ id: "icon4" });
var icon5 = new Icon({ id: "icon5" });

// Gauges
var gauge1 = new Gauge({ id: "gauge1" });
var gauge2 = new Gauge({ id: "gauge2" });
var gauge3 = new Gauge({ id: "gauge3" });
var gauge4 = new Gauge({ id: "gauge4" });
var gauge5 = new Gauge({ id: "gauge5" });
var gauge6 = new Gauge({ id: "gauge6" });
var gauge7 = new Gauge({ id: "gauge7" });
var gauge8 = new Gauge({ id: "gauge8" });
var gauge9 = new Gauge({ id: "gauge9" });
var gauge10 = new Gauge({ id: "gauge10" });

// Background
var style = new Style({ id: "style" });
