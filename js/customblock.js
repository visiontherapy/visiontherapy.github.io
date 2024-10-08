
customElements.define("bl-ock", class CustomBlock extends HTMLElement {

  set value(val) {
    this._value = val;
    //if (!this.dataset.noshow) this.innerHTML = val ? val : this.title; // 
    this.setAttribute("value", val);
  }

  get value() {
    return this._value;
  }

  constructor() {
    super();
    //this.state = 0;
    // this.rotations = ["0deg", "90deg", "180deg", "270deg"];

    // this.value = this._value;

    this.burst = function (pattern) {
      let burst = [];
      let duo = "";
      for (let i = 1; i <= 8; i++) {
        duo += pattern.match(i.toString()) ? "1" : "0";
        if (i % 2 == 0) {
          burst.push(duo);
          duo = "";
        }
      }
      // console.log(burst);
      return burst;
    };

    this.checker = function (x, y) {
      // console.log(this.value, this.flower);

      let moveaway = x && y;
      // if coordinates are given (moving away) grab that box
      // or else get parentelement
      let slot = moveaway ? document.querySelector(`.playslot[data-x='${x}'][data-y='${y}']`) : this.parentElement;

      // if this is a move away, set flower to null
      let flower = moveaway ? [, , ,] : this.flower;
      let playfield = slot.parentElement;
      x ??= slot.dataset.x;
      y ??= slot.dataset.y;

      // get neighbors of index box
      let naboer = [
        playfield.querySelector(`.playslot[data-x='${x - 1}'][data-y='${y}'] bl-ock`),
        playfield.querySelector(`.playslot[data-x='${x}'][data-y='${y - -1}'] bl-ock`),
        playfield.querySelector(`.playslot[data-x='${x - -1}'][data-y='${y}'] bl-ock`),
        playfield.querySelector(`.playslot[data-x='${x}'][data-y='${y - 1}'] bl-ock`)
      ];
      // console.log(x, y, naboer);

      let nabber = [];
      for (let n = 0; n < 4; n++) {
        if (!naboer[n]) continue;
        nabber[n] = naboer[n].flower[(2 + n) % 4].split("").reverse().join(""); // this is the edge matchup
      }

      if (moveaway) {
        for (const nab of naboer) {
          if (nab && nab != this) nab.checker();
        }
      } else {
        this.correct = true;
        for (let p = 0; p < 4; p++) {
          if (nabber[p] && flower[p] != nabber[p]) {
            this.correct = false; break;//no points
          }
        }

        if (this.correct) {
          this.classList.remove("fail");
          // here check neighbors
          for (const nabo of naboer) {
            if (!nabo || nabo.correct) continue;
            nabo.checker();
          }
        } else {
          this.classList.add("fail");
        }

      }
    };

    this.deltashift = function (delta) {
      if (delta > 0) {
        // console.log("forward");
        for (let n = 0; n < delta; n++) {
          this.flower.unshift(this.flower.pop());
        }
      } else if (delta < 0) {
        // console.log("backward");
        for (let n = 0; n < Math.abs(delta); n++) {
          this.flower.push(this.flower.shift());
        }
      }
    };
  }

  static observedAttributes = "data-state".split(" ");
  attributeChangedCallback(name, oldValue, newValue) {
    let delta = newValue - oldValue;
    if (name == "data-state" && delta != 0) {
      // console.log("CHanged----", newValue);
      if (this.flower) {
        this.deltashift(delta);
      } else {
        this.delta = delta;
      }
    }
  }


  connectedCallback() {
    this.value = this.getAttribute("value");
    let states = [];
    if (!this.id) {
      for (let r = 0; r < 4; r++) {
        states[r] = document.createElement("div");
        states[r].dataset.rot = r;
        states[r].classList.add("layer");
        //if (r>0) states[r].classList.add("noshow");
        //console.log(this.value,this.value.split("").map(v =>(v+2*r)%8));
        let layervalue = this.value.split("").map(v => {
          let rotr = (parseInt(v) + 2 * r) % 8;
          return rotr == 0 ? 8 : rotr;
        }).join("");
        for (let i = 1; i <= 8; i++) {

          let b = document.createElement("div");
          // b.innerText = i;
          b.className = "wedge part_" + i;
          if (layervalue.match(i)) {
            b.style.setProperty("--color", "var(--fg)");
          } else {
            b.style.setProperty("--color", "var(--ctrlbg)");
          }
          states[r].append(b);
        }
        this.append(states[r]);
      }
    }

    this.id = "block" + this.value;

    this.dataset.state ??= "0";

    this.flower ??= this.burst(this.value);

    // console.log("thisdelta",this.delta);
    if (this.delta) {
      this.deltashift(this.delta);
      this.delta = null;
    }

    this.checker();

    this.onclick = this.oncontextmenu = function (e) {
      if (e.type == "click") {
        this.dataset.state = ++this.dataset.state % 4;
      } else if (e.type == "contextmenu") {
        e.preventDefault();
        this.dataset.state = (4 + --this.dataset.state) % 4;
      }
      // rotation actions performed in attributeChangedCallback
      this.checker();
    };


  }



});
