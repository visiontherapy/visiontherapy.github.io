// COMMON FUNCTIONS

// import loadCSS from "./borrowed/loadcss.js";

// console.log(loadCSS);

let borrowedjs = "localcookie.js addcss.js arrayshuffle.js circlemenu-new.js loadcss.js loadscript.js makedimbg.js randoms.js toradians.js".split(" ");

let borrowedcss = "circlemenu-new.css".split(" ");


for (let js of borrowedjs) {
  loadScript("borrowed/"+js);
}

loadScript("darkmode.js");
console.log(localCookie);


// function ashuffle(array) {
//   return array.map(value => ({ value, sort: Math.random() }))
//     .sort((a, b) => a.sort - b.sort)
//     .map(({ value }) => value);
// }

// function random(seed) {
//   seed ??= Math.random() * 10 ** 9;
//   let m = 2 ** 35 - 31;
//   let a = 185852;
//   let s = seed % m;
//   return function () {
//     return (s = (s * a) % m) / m;
//   };
// }

// function minmax(min, max) {
//   return min + Math.floor(Math.random() * (max - min + 1));
// }

// function minmaxexcept(min, max, except) {
//   let num = min + Math.floor(Math.random() * (max - min + 1));
//   return num == except ? minmaxexcept(min, max, except) : num;
// }

// function randarray(arr, except) {
//   let num = arr[Math.floor(Math.random() * (arr.length))];
//   return (except && except.includes(num)) ? randarray(arr, except) : num;
// }

// function localCookie(name, value) {
//   // if only name, retrieve item value
//   // if name & value, set item
//   // if value === null , remove item
//   // value can be set to false or 0
//   try {
//     var storage = window.localStorage;
//   } catch {
//     console.warn("LocalStorage not available");
//     return undefined;
//   }
//   if (!name) {
//     return undefined;
//   } else if (value === undefined) {
//     return storage.getItem(name);
//   } else if (value === null) {
//     storage.removeItem(name);
//     return true;
//   } else if (value) {
//     storage.setItem(name, value);
//     return value.toString();
//   }
// }


// const BUTTONCLASS = "btn";
// function floatmenu({ styles = {}, config = {}, menuitems, anchor } = {}) {
//   //console.log(anchor,config);
//   //	anchor.className = "circlemenuinput";
//   var TOGGLEID = anchor.id + "toggle";
//   anchor.numitems = menuitems.length - 2;



//   styles.btnsize ??= getComputedStyle(anchor).getPropertyValue("--btnsize") ?? getComputedStyle(document.documentElement).getPropertyValue("--btnsize") ?? "3em";
//   styles.flingdelay ??= 0.1;
//   styles.direction ??= 1; //1 is down/clockwise -1 is up/counterclockwise
//   //anchor.direction = config.direction;
//   styles.imgsize ??= styles.btnsize;
//   styles.lineheight ??= styles.btnsize;
//   styles.linearbg ??= "#444";
//   styles.gapsize ??= "2px"; // optional,gap between menu items
//   styles.radius ??= "7em";
//   styles.leftright ??= "left:0;";

//   for (let [name, value] of Object.entries(styles)) {
//     anchor.style.setProperty('--' + name, value);
//   }

//   config.ellipse ??= 1;


//   //default rounded to btnsize
//   if (config.rounded == false) anchor.style.setProperty('--borderradius', "0");

//   // need to set width so that positioning works correctly
//   anchor.style.width = "var(--btnsize)";
//   anchor.style.height = "var(--btnsize)";


//   //autocalculate ARC so that each button is equidistant 1/2 btnsize apart
//   config.arc ??= 360 * ((styles.btnsize.replace(/\D+/g, '')) * (1.5 * anchor.numitems - 1)) / (Math.PI * 2 * (styles.radius.replace(/\D+/g, '')));
//   if (config.arc > 360) config.arc = 360; //max full circle

//   var startangle = config.hasOwnProperty("startpoint") ? 180 - config.startpoint : 180 - (180 - config.arc) / 2;
//   var endangle = startangle - config.arc;
//   var theta = (startangle - endangle) / (anchor.numitems - 1);
//   if (theta * anchor.numitems > 360) theta = (startangle - endangle) / anchor.numitems; //correction for full circle menu
//   var vertoffset = config.alignbottom == true ? config.ellipse * Math.sin(toradians(-endangle)) : 0; // vertical offset
//   var ellipseXaxis = 1;


//   let menustyle = `
	
// 	 #${anchor.id}.circlemenu input#${TOGGLEID}:checked ~ .show-menu .btn .menuBtn {opacity: 0;}
	
//    #${anchor.id}.circlemenu input#${TOGGLEID}:checked ~ .show-menu .btn .closeBtn { opacity: 1;}`; //transform: translateY(0);
//   //transform: translateY(-50px); 

//   for (i = 0; i < anchor.numitems; i++) {
//     let nth = i + 1;
//     let inverse = anchor.numitems - i; // so that cascading menu items flow behind item above it // goes with menuitems.reverse() below
//     menustyle += `
// 		#${anchor.id} .btn:nth-child(${inverse}) {
//      top:0em;
// 		 ${config.style == "rounded" ? "left:0;" : styles.leftright};
// 			transition-delay: ${i * styles.flingdelay}s;}
			
// 		#${anchor.id}.circlemenu input#${TOGGLEID}:checked ~ .show-menu .btn:nth-child(${inverse}) {
// 		`;

//     if (config.style == "linear") {
//       menustyle += `
// 			${styles.leftright};
// 			top: calc( (${config.direction} *( var(--lineheight) + (${styles.lineheight} + ${styles.gapsize}) * ${i})));
// 			opacity:1;
// 		}
// 			`;

//     } else { //CIRCULAR MENU
//       var thisangle = toradians(startangle - (theta * i));
//       if (config.direction == -1) {
//         thisangle = toradians(endangle + (theta * i));
//       }

//       menustyle += `
// 			left: calc(${styles.radius} * ${ellipseXaxis * Math.cos(thisangle)});
// 			top: calc(${styles.radius} * ${config.ellipse * (-Math.sin(thisangle)) - vertoffset}); opacity:1;}`;
//     }
//   }


//   addCSS(menustyle, anchor.id + "_circlemenu");



//   //menuitems = config.data;

//   var chkbox = document.createElement("input");
//   chkbox.type = "checkbox";
//   chkbox.id = TOGGLEID;
//   anchor.insertBefore(chkbox, null); //checkbox for CSS toggle action
//   anchor.classList.add("circlemenu");
//   if (config.style == "linear") anchor.classList.add("linearmenu");

//   var menulabel = document.createElement("label");
//   menulabel.classList.add("show-menu");
//   menulabel.id = anchor.id + "_menulabel";
//   menulabel.htmlFor = TOGGLEID;

//   //insert first 2 buttons for toggler button
//   var togglediv = document.createElement("div");
//   togglediv.classList.add(BUTTONCLASS);
//   togglediv.classList.add("togglediv");
//   for (i = 0; i < 2; i++) {
//     var btn = menuitems.shift();
//     var trigger = document.createElement("div");
//     // use div so Lighthouse does not complain about uncrawlable links
//     trigger.id = btn.id;
//     //trigger.className = btn.class;
//     trigger.classList.add(i == 0 ? "menuBtn" : "closeBtn");
//     trigger.classList.add("toggleBtn");
//     var img = document.createElement("img");
//     //img.id = "img_" + btn.id; //add ID here if you need to reference the image
//     img.src = btn.src;
//     img.alt = btn.title = btn.alt;
//     trigger.insertBefore(img, null);
//     togglediv.insertBefore(trigger, null);
//   }

//   for (idx in menuitems.reverse()) {
//     // for (let idx = menuitems.length -1; idx >=0; idx--) {
//     var btn = menuitems[idx];
//     if (btn.hidden == true) continue;
//     // var trigger = document.createElement(btn.link ? "a" : "div");
//     var trigger = document.createElement("a");
//     trigger.classList.add(BUTTONCLASS);
//     trigger.id = btn.id;
//     trigger.title = btn.alt;
//     //trigger._target="_blank"; trigger.rel="noopener"; //optional

//     // if (btn.link != "") trigger.href = btn.link;
//     if (btn.link != "") {
//       // let btnlink = btn.link;
//       trigger.href = btn.link;
//       trigger.onclick = function (e) {
//         // ** toggle menu button so menu closes
//         document.getElementById(TOGGLEID).checked = false;
//         // window.location.assign(btnlink);
//       };
//     }

//     var img = document.createElement("img");
//     //img.id = "img_" + btn.id;
//     img.alt = btn.alt;
//     img.src = btn.src;
//     trigger.insertBefore(img, null);
//     if (config.style == "linear") {
//       var span = document.createElement("span");
//       span.innerHTML = btn.alt;
//       trigger.insertBefore(span, null);
//     }
//     menulabel.insertBefore(trigger, null);
//   }

//   menulabel.append(togglediv); // add last so that it sits on top of other menu items


//   anchor.insertBefore(menulabel, null);

//   //anchor.config = JSON.parse(JSON.stringify(config));
//   anchor.styles = styles;
//   anchor.config = config;

//   if (config.style == "linear") autowidth(anchor);


// } //END FLOATMENU

// ////////////////////////////////////
// // ADJUST WIDTH FOR LONGEST LABEL //
// ////////////////////////////////////
// function autowidth(anchor) {
//   //console.log("--AUTOWIDTH--",anchor.config);
//   if (anchor.styles.menuwidth) return;
//   anchor.style.setProperty('--menuwidth', "auto");
//   let btns = anchor.getElementsByClassName("btn");

//   let imgem = getComputedStyle(anchor).getPropertyValue('--imgsize').match(/([\.\d]*)/)[0];
//   let imgpx = (btns[1].getElementsByTagName("img")[0].getBoundingClientRect()).width;

//   let converter = imgem / imgpx; // convert to EMs


//   let widths = [];
//   let bannerwidths = [];
//   for (i = 1; i < btns.length; i++) {
//     //start at i=1 == skip first child
//     widths.push(btns[i].getBoundingClientRect().width * converter);
//     if (i <= anchor.config.banner) bannerwidths.push(btns[i].getBoundingClientRect().width * converter);
//     //console.log(btns[i].id, btns[i].getBoundingClientRect().width * converter);

//   }

//   anchor.style.setProperty('--menuwidth', (0.5 + Math.max(...widths)) + "em");

//   //console.log("menufixedwidth", (0.5 + Math.max(...widths)) + "em");
//   if (anchor.config.banner) {

//     //banner options: number of items to show in banner if too narrow		

//     //console.log(widths, (widths.reduce((a, b) => a + b, 0) + "em"));

//     // THIS gives wrong sum because of font size scaling. menu font is 75% of baseline
//     // CRAPPY HACK = divide by 75%
//     // navheight could be btnsize
//     let bannerstyle = `
//   @media only screen and (min-width:${(1 / 0.85) * widths.reduce((a, b) => a + b, 0)}em) {
//     main { padding-top: calc(var(--btnsize) + ${anchor.styles.lineheight}) }
//     #${anchor.id} label.show-menu {display: flex; position: fixed; left: 0; flex-direction: row; justify-content: flex-end; width: 100%; top: var(--btnsize); }
//     #${anchor.id} .btn:first-child { display:none; }
//     #${anchor.id} .btn:not(:first-child) { position:relative!important; top: 0 !important; opacity: 1 !important; pointer-events: auto; z-index:1000;}
//   }
// `;
// //+ "#${anchor.id} .btn:first-child { right:0 !important; }" //CRAPPY HACK
//     if (anchor.config.banner >= 2) {
//       bannerstyle += `
//       @media only screen and (min-width:${(1 / 0.85) * bannerwidths.reduce((a, b) => a + b, 0)}em) and (max-width:${(1 / 0.85) * widths.reduce((a, b) => a + b, 0)}em) {
//         main { padding-top: calc(var(--btnsize) + ${anchor.styles.lineheight}) }
//         #${anchor.id} input[type="checkbox"]:not(:checked) ~ label.show-menu {display: flex; position: fixed; left: 0; flex-direction: row; justify-content: flex-end; width: 100%; top: var(--btnsize); }
//         /* CRAPPY HACK for fixed icon*/
//         #${anchor.id} input[type="checkbox"]:not(:checked) ~ label .btn:first-child { position: fixed; top: 0 !important; right:0 !important; }`;

//       for (i = 1; i <= anchor.config.banner + 1; i++) {
//         bannerstyle += `#${anchor.id} input[type="checkbox"]:not(:checked) ~ label .btn:nth-child(${i}), `;
//       }
//       bannerstyle += "#comma_terminator_placeholder { position:relative!important; top: 0 !important; opacity: 1 !important; pointer-events: auto; z-index:1000;} }";

//     }
//     addCSS(bannerstyle, anchor.id + "_maxwidth");
//   }
// }



// ------------------------------------------------
// ------------------------------------------------
// ------------------------------------------------
// REQUIRED FUNCTIONS
// // addcss
// function addCSS(css, id, anchor) { // append CSS style element to head
// 	let styl = document.querySelector(`#${id}`) ?? document.createElement("style");
//   styl.innerHTML = css;
//   styl.id = id;
//   anchor ? anchor.appendChild(styl) : document.head.appendChild(styl);
//   return styl;
// }

// makedimbg
// - place translucent screen over everything.
// - click or press Escape to dismiss
// - useful for pulling attention to floating window
// - onclickfn replaces click response
// // - alsofn runs in addition to default click response
// function makedimbg({ source, parentbox, before, onclickfn, fadetime = "0.35s", alsofn } = {}) {
//   let dimbox;

//   dimbox = document.createElement("div");
//   dimbox.style = "position:fixed;inset:0;background:#444b;opacity:0;";
//   dimbox.style.transition = `opacity ${fadetime} ease`;

//   if (parentbox != null) {
//     if (before) {
//       parentbox.insertBefore(dimbox,before);
//     } else {
//     parentbox.appendChild(dimbox);
//     }
//   } else {
//     document.body.appendChild(dimbox);
//   }

//   // slight delay to let above styles set up first
//   setTimeout(function () {
//     dimbox.style.opacity = "1";
//   }, 5);


//   // if onclick function is set, use it instead.
//   // NOTE: custom function must also manage the dimbox (eg let dimbg = makedimbg({onclickfn:functionname}); ----> functionname() {dimbg.remove()};
//   onclickfn ??= function (e) {
//     e.preventDefault();

//     // if alsofn is set, do that ALSO
//     if (alsofn instanceof Function) alsofn(); 

//     // fadeout transition
//     // note: without fadeout, it's just dimbox.remove() and source.remove();
//     dimbox.style.opacity = "0";
//     if (source) {
//       source.style.transition = `opacity ${fadetime} ease`;
//       source.style.opacity = "0";
//     }
//     setTimeout(function () {
//       dimbox.remove();
//       if (source) source.remove();
//     }, parseFloat(fadetime.replace(/s$/, "")) * 1100);

    
//   };

//   dimbox.onclick = dimbox.ontouch = function (e) {
//     onclickfn(e);
//     window.removeEventListener("wheel", dontscroll);
//     window.removeEventListener("keydown", doescape);
//   };

//   window.addEventListener("keydown", doescape);
//   window.addEventListener("wheel", dontscroll, { passive: false });


//   function dontscroll(e) {
//     e.preventDefault();
//     console.log("no scrolling");
//   }

//   function doescape(e) {
//     if (e.key == "Escape") {
//       e.preventDefault();
//       window.removeEventListener("wheel", dontscroll);
//       window.removeEventListener("keydown", doescape);
//       onclickfn(e);
//     } else if (e.code.match(/^(Arrow|Page|Space)/)) {
//       // prevent scrolling the main webpage
//       console.log(e.code, "No scrolling while dimbg");
//       e.preventDefault();
//     }
//   }


//   return dimbox;
// }


// // toradians
// function toradians(degrees) {
//   return degrees * Math.PI / 180;
// };

// // ------------------------------------------------
// ------------------------------------------------
// ------------------------------------------------
