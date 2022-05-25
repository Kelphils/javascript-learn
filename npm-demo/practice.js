function time(hour) {
  if (hour < 10) {
    greeting = "Good morning";
  } else if (hour < 20) {
    greeting = "Good day";
  } else {
    greeting = "Good evening";
  }
  return greeting;
}

var hour = new Date().getHours();

var log = time(hour);
console.log(log);

let devive = null;
console.log(typeof devive);

function range(start, end, interval = 0) {
  let arr = [];
  interval = interval > 0 ? interval - 1 : 0;
  for (let i = start; i < end; i++) {
    arr.push(i);
    i += interval;
  }
  return arr;
}
console.log(range(0, 100, 5));
