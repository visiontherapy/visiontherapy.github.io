
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

  }



  static observedAttributes = "orient grid value pos".split(" ");

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log("attribute changed", name, oldValue, newValue);
    // this[name] = newValue;
  }



  connectedCallback() {
    this.value = this.getAttribute("value");
    this.id="block" + this.value;

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

    this.onclick = function(e) {
      this.state = ++this.state%4;
      // console.log(this.state);

// console.log(this.rotations[this.state]);
      this.style.setProperty("--rot",this.rotations[this.state]);
    }

  }



});