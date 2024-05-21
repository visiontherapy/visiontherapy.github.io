
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
    this.state = 0;
    this.rotations = ["0deg", "90deg", "180deg", "270deg"];

    // console.log(this.value, this._value, this.getAttribute("value"))
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
        // console.log(n, naboer[n].flower);
        nabber[n] = naboer[n].flower[(2 + n) % 4].split("").reverse().join(""); // this is the edge matchup
      }
      // console.log(this.flower, nabber);

      if (moveaway) {
        for (const nab of naboer) {
          // console.log("nab",nab);
          if (nab && nab != this) nab.checker();
        }
      } else {
        this.correct = true;
        for (let p = 0; p < 4; p++) {
          if (nabber[p] && flower[p] != nabber[p]) {
            this.correct = false; break;//no points
          }
        }

        // console.log(this.correct? "ALl good!" : "fail " + this.correct + " out of 4");

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


    // this.flower = this.burst(this._value);


  }

  // static observedAttributes = "initstate".split(" ");
  // attributeChangedCallback(name, oldValue, newValue) {
  //   if (name == "initstate" && this.rotatestate) {
  //     this.state = newValue;
  //     this.rotatestate();
  //   }
  // }
  // console.log("attr chage", name, newValue);


  connectedCallback() {
    this.value = this.getAttribute("value");
    this.id = "block" + this.value;
    for (let i = 1; i <= 8; i++) {
      let b = document.createElement("div");
      // b.innerText = i;
      b.className = "part_" + i;
      if (this.value.match(i)) {
        b.style.setProperty("--color", "var(--ctrlbg)");
      } else {
        b.style.setProperty("--color", "var(--fg)");
      }
      this.append(b);
    }

    this.flower ??= this.burst(this.value);
    // console.log("flowr",this.flower);

    this.rotatestate = function (state) {
      if (state) this.state = state;
      this.style.setProperty("--rot", this.rotations[this.state]);
      this.flower.unshift(this.flower.pop());
      // console.log(this.flower);
      this.checker();
    };


    this.onclick = function (e) {
      this.state = ++this.state % 4;
      this.rotatestate();
    };

    

  }



});