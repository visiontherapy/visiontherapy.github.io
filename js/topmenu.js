
let styles = {
  flingdelay: 0.0, // animation delay in seconds (for staggered opening)
  menuspeed: .5, // animation speed /// change name to menuspeed
  btnsize: "1.5em", // size of buttons
  //menuwidth: "16em", // width of menu items, default is auto-calculated
  imgsize: "1.25em", // defaults to btnsize, this is the size of the image icons within the linear menu items
  lineheight: "1.75em", // defaults to btnsize, line height of the linear menu items
  linearbg: "#444", // bg color of linear menu items
  // gapsize: "0.1em",//"0px", // gap between linear menu items. no gap must have "0px" dimensions stated
  // radius: "7em", // radius of the circle along which icons are placed
  leftright: "right:0em;"
};


var configuration = {
  scroll: true,
  rounded: false, // t/f rounded borders
  style: "linear",
};

// DATA is required
let data = [ //first two items comprise the menu opener (open / close)
  {
    "id": "id1",
    "src": "img/menuburger.svg",
    "alt": "MENU"
  }, {
    "id": "id2",
    "src": "img/menuburger.svg",
    "alt": "X"
  }, {
    "id": "idhome",
    "src": "img/logo.svg",
    "alt": "Home",
    "link": "index.html"
  }, {
    "id": "id3",
    "src": "img/icon_saccades.svg",
    "alt": "CP Saccades",
    "link": "cpsaccades.html"
  }, {
    "id": "id4",
    "src": "img/icon_hart.svg",
    "alt": "Hart Chart",
    "link": "hartchart.html"
  }, {
    "id": "id13",
    "src": "img/icon_shapes.svg",
    "alt": "Shape Chart",
    "link": "shapechart.html"
  }, {
    "id": "id5",
    "src": "img/icon_tracking.svg",
    "alt": "Letter Tracking",
    "link": "lettertracking.html"
  }, {
    "id": "id6",
    "src": "img/icon_glyphs.svg",
    "alt": "Tranaglyphs",
    "link": "tranaglyphs.html"
  }, {
    "id": "id7",
    "src": "img/icon_lines.svg",
    "alt": "Line Counting",
    "link": "lines.html"
  }, {
    "id": "id8",
    "src": "img/icon_blocks.svg",
    "alt": "Pattern Blocks",
    "link": "blocks.html"
  }, {
    "id": "id9",
    "src": "img/icon_spotit.svg",
    "alt": "Spot the Match",
    "link": "spotmatch.html"
  }, {
    "id": "id10",
    "src": "img/icon_slaptap.svg",
    "alt": "Slap Tap",
    "link": "slaptap.html"
  }, {
    "id": "id11",
    "src": "img/icon_fistbump.svg",
    "alt": "Closed/Open/Flat",
    "link": "fistbump.html"
  }, {
    "id": "id12",
    "src": "img/icon_color.svg",
    "alt": "Color Touch",
    "link": "colortouch.html"
  },
];

let menuthing = document.createElement("div");
menuthing.id = "menuthing";
document.querySelector("#ctrlbar").append(menuthing);
// styles:styles,config:configuration,
// floatmenu({ styles: styles, config: configuration, menuitems: data, anchor: document.querySelector("#menubenu") });
floatmenu({ styles: styles, config: configuration, menuitems: data, anchor: menuthing });

