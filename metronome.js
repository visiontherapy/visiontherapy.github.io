
/* TODO:
audio switch
metronome switch
- if no audio, just flash icon
- if audio flash and beep
*/


// let blip = new Audio("click.wav");
let bpm = 60;

let metronome;


document.querySelector("#bpm").oninput = function () {
  console.log(this.value);
  bpm = parseInt(this.value);
};

/* 
TODO: 
metronome on/off by spacebar
set BPM by slider / text
set bpm by tapping
https://web.dev/articles/audio-scheduling

TRY THIS ONE INSTEAD
https://ircam-ismm.github.io/webaudio-tutorials/scheduling/timing-and-scheduling.html

*/

let lasttime = 0;
let actx, g;
let beatcount = 10;
let beats = [];
let tappinterval;
let beatsavg;
document.querySelector("#tapp").onmousedown = function (e) {

  console.log(tappinterval);
  clearbeeps();
  beep({ dobeep: false });
  let interbeat = actx.currentTime - lasttime;
  lasttime = actx.currentTime;
  if (interbeat > beatsavg * 3) {
    console.log("clearing beats");
    beats = [];
    interbeat = 0;
  }
  if (interbeat) beats.push(interbeat);
  if (beats.length > beatcount) beats.shift();
  let beatsum = 0;
  beats.map(n => beatsum += n);
  beatsavg = beatsum / beats.length;
  // console.log(beats, beatsum, beats.length, beatsavg);
  bpm = document.querySelector("#bpm").value = interbeat ? Math.round(60 / beatsavg) : "--";
  //console.log("Beatsavg",beatsavg);
  if (beatsavg > 0) {
    dometronome(beatsavg > 0);
    // tappinterval = setTimeout(() => {
    //  // dometronome(beatsavg > 0);
    //   console.log("metronoming");
    // }, beatsavg * 1000);
  } else {
    beep();
  }
};


function clearbeeps() {
  if (metronome) clearInterval(metronome);
  // if (tappinterval) clearTimeout(tappinterval);
  // tappinterval = 
  metronome = null;

}


function beep({ dobeep = true } = {}) {


  if (!actx) actx = new AudioContext();
  if (!g) g = actx.createGain();
  osc = actx.createOscillator();
  osc.frequency.value = 700;
  let defgain = 0.5;
  g.gain.value = defgain;
  osc.connect(g);
  g.connect(actx.destination);
  if (dobeep) {

    /*

      // flash icon
    if (audioswitch) {
    }
    */

    console.log("beeping");
    osc.start(actx.currentTime);
    g.gain.setTargetAtTime(0, actx.currentTime + 0.01, 0.07,);
    osc.stop(actx.currentTime + 0.1);
    g.gain.setTargetAtTime(defgain, actx.currentTime + 0.15, 0);
  }
}


let metrocheck = document.querySelector("#metrocheck");

metrocheck.onchange = function (e) {
  console.log("metronome", metronome);
  if (this.checked && !metronome) {
    dometronome();
  } else {
    console.log("clearing");
    clearbeeps();
  }
  //metronome = !metronome;
};

// document.querySelector("#metronome").onclick = function () {
//   if (metronome) {
//     console.log("clearing");
//     clearbeeps();
//   } else {

//     dometronome();
//   }
//   //metronome = !metronome;
// };







function dometronome(firstbeep = true) {
  metrocheck.checked = true;
  console.log("do metroneme", metronome);
  beep({ dobeep: firstbeep });
  //https://loophole-letters.vercel.app/web-audio-scheduling#built-in-web-audio-scheduling-methods
  let phase = actx.currentTime;
  // bpm = 
  console.log("BPM", bpm);
  const period = 0.5; // schedule period in seconds
  const overlap = 0.25; // margin for errors

  let interval = 60 / bpm;
  function metronomecallback() {
    // https://stackoverflow.com/questions/15091059/change-interval-of-setinterval
    // do this so that interval can be updated with each go around...?
    interval = 60 / bpm;
    // time slice for this callback:
    const lookahead = actx.currentTime + interval + overlap;
    // step through each slice of time for this callback
    while (phase < lookahead) {
      const [begin, end] = [phase, phase + period];
      // console.log(begin, end, interval);
      beep();
      break;
      phase += period;
    }
    metronome = setTimeout(metronomecallback, interval * 1000);
  }
  metronome = setTimeout(metronomecallback, interval * 1000);
}




function newjitterydometronome() {

  beep({ dobeep: false });
  function metro(currentTime) {
    console.log(currentTime);
    // play some sound at `currentTime`
    beep();
    // return the next time we want to do something
    return currentTime + 60 / bpm;
  }

  // create a new LookaheadScheduler
  const scheduler = new LookaheadScheduler();
  // add the metronome to the scheduler, starting now
  scheduler.add(metro, actx.currentTime);
  metronome = scheduler.ticker;

}


class PriorityQueue {
  constructor() {
    // array in which we store the elements of the queue
    this.queue = [];
  }

  // add an event with its associated priority into the queue
  add(event, time) {
    // pack `event` and `time` into a single data structure
    const element = { event, time };
    // add the data structure into the queue
    this.queue.push(element);
    // sort the queue so that the element with highest priority (i.e. smallest time)
    // is at the beginning of the list
    this.queue.sort((a, b) => a.time <= b.time ? -1 : 1);
  }

  // return the event with highest priority or `null` if the queue is empty
  head() {
    if (this.queue.length > 0) {
      return this.queue[0];
    } else {
      return null;
    }
  }

  // delete the first element of the queue
  deleteHead() {
    this.queue.shift();
  }
}


class LookaheadScheduler {
  constructor() {
    this.priorityQueue = new PriorityQueue();
    this.period = 0.05;
    this.lookahead = 0.1;

    // make sure the tick method is called with the right `this` context,
    // whatever its call context (welcome to JavaScript :)
    this.tick = this.tick.bind(this);
    // launch the periodic `tick` call
    this.ticker = setInterval(this.tick, this.period * 1000);
  }

  add(event, time) {
    // insert the event, time pair into the queue
    this.priorityQueue.add(event, time);
  }

  // This function is executed by the `setInterval` every 50 ms.
  // This is where all the magic happens
  tick() {
    // get the current time of the audio context and the current head of the queue
    const now = actx.currentTime;
    let head = this.priorityQueue.head();

    // unstack the queue while the head is in the time frame defined by the lookahead
    while (head && head.time < now + this.lookahead) {
      // the head will be processed so we can remove it from the queue
      this.priorityQueue.deleteHead();
      // pick the time and event from the head
      // the time of the event is not `now`, it is somewhere between now and now + lookahead
      const time = head.time;
      const event = head.event;

      // Execute the event giving it its time as argument.
      // If the event returns a new time, i.e. it wants to be called again later,
      // we can re-insert it right away into the queue.
      const nextTime = event(time);

      if (nextTime) {
        this.priorityQueue.add(event, nextTime);
      }

      // pick the next event in the queue and check if it is in the lookahead
      head = this.priorityQueue.head();
    }
  }
}

