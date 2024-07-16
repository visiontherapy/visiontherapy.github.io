// COMMON FUNCTIONS

function ashuffle(array) {
  return array.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function random(seed) {
  seed ??= Math.random() * 10 ** 9;
  let m = 2 ** 35 - 31;
  let a = 185852;
  let s = seed % m;
  return function () {
    return (s = (s * a) % m) / m;
  };
}




function minmax(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}


function minmaxexcept(min, max, except) {
  let num = min + Math.floor(Math.random() * (max - min + 1));
  return num == except ? minmaxexcept(min, max, except) : num;
}



function randarray(arr, except) {
  let num = arr[Math.floor(Math.random() * (arr.length))];
  return (except && except.includes(num)) ? randarray(arr, except) : num;
}