

function getqr(data, target) {
  let [w, h] = [250, 250];
  let qrcode = document.createElement("a");
  qrcode.className = "qrcode";
  qrcode.href = data;
  if (target) qrcode.target = target;
  new QRCode(qrcode, {
    text: data,
    width: w,
    height: h,
    colorDark: "#000",
    colorLight: "#fff",
    correctionLovel: QRCode.CorrectLevel.L,
  });
  // let qrplace = document.querySelector("#qrplace");
  // qrplace.innerHTML = `<input type="checkbox" class="slider" id="qrtoggle" /><label for="qrtoggle">QR code</label>`;
  // qrplace.innerHTML = "";
  // qrplace.append(qrcode);
  // qrplace.innerHTML += data;
  return qrcode;
}