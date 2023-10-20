const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

// function for random points in convas

function drawRandomPoint(x, y, name) {
  context.beginPath();
  context.arc(x, y, 3, 0, 2 * Math.PI);
  context.fillStyle = "red"; // Point color
  context.fill();
  context.closePath();
  context.fillStyle = "red"; // Text color
  context.font = "12px Arial"; // Font style
  context.fillText(name, x + 5, y - 5);
}

if (!localStorage.getItem("myarray")) {
  // If it doesn't exist, initialize it as an empty array and store it
  localStorage.setItem("myarray", JSON.stringify([[]]));
}

// for deleting point from map

function deleteFromArray2D(arr2D, targetArray) {
  // Use the filter method to create a new array with elements that do not match the targetArray.
  return arr2D.filter((subArray) => !arraysEqual(subArray, targetArray));
}

// A function to check if two arrays are equal.
function arraysEqual(arr1, arr2) {
  console.log("h");
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

function getdata(x1, y1, x2, y2, name1, name2) {
  var slope = (y2 - y1) / (x2 - x1);
  //  Calculate differences in coordinates
  delta_x = x2 - x1;
  delta_y = y2 - y1;

  //  Calculate the angle in radians
  angle_radians = Math.atan2(delta_y, delta_x);
  midpoint_x = (x1 + x2) / 2;
  midpoint_y = (y1 + y2) / 2;
  midpoint = (midpoint_x, midpoint_y);

  // Calculate distance between 2 points
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  //angle between 2 points withrespect to x-axis
  const angleRadians = Math.atan2(deltaY, deltaX);
  const angleDegrees = (angleRadians * 180) / Math.PI;
  console.log(
    "slope ",
    slope,
    " angle radian ",
    angle_radians,
    " mid points ",
    midpoint,
    " distance ",
    distance,
    " angle degree ",
    angleDegrees
  );
  document.getElementById(
    "ab_data"
  ).innerHTML = `INFORMATION ABOUT POINTS ${name1}(${x1},${y1}) ${name2}(${x2},${y2})`;
  document.getElementById(
    "data_show"
  ).innerHTML = `<b>slope : </b> ${slope}<br>  <b>angle in radian : </b> ${angle_radians}<br> <b>angle in radian : </b> ${angleDegrees}<br> <b>mid points : </b> ${midpoint}<br> <b>distance : </b> ${distance} `;
}

// console.log(document.getElementById("delete_point").value);
const btn_delete = document.getElementById("delete_a");
btn_delete.addEventListener("click", function (event) {
  const storedData = localStorage.getItem("map");
  const mapfromStorage = new Map(JSON.parse(storedData));
  const a_delete = document.getElementById("delete_point").value;
  console.log(a_delete);
  if (mapfromStorage.has(a_delete)) {
    var arr_del = JSON.parse(localStorage.getItem("myarray"));

    console.log("main array is ", arr_del);
    const storedData = localStorage.getItem("map");
    const mapfromStorage = new Map(JSON.parse(storedData));
    const mn_data = mapfromStorage.get(a_delete);

    const next = deleteFromArray2D(arr_del, mn_data);

    localStorage.setItem("myarray", JSON.stringify(next));

    document.getElementById("delete_point").value = "";
    const d = JSON.parse(localStorage.getItem("main"));
    console.log(d);
    calldata(d[0], d[1], d[2]);
  } else {
    alert("value does exists at point enter valid point  ", a_delete);
    document.getElementById("delete_point").value = "";
  }
});

function drawline(x, y) {
  console.log("called now else");
  const jsonString = localStorage.getItem("map");
  const mapArray = JSON.parse(jsonString);

  clearscreen();

  // Convert the array back to a map-like object
  const m1 = new Map(mapArray);
  console.log(m1);
  context.beginPath();
  if (m1.get(x)) var aa = m1.get(x)[0];
  var bb = m1.get(x)[1];
  var cc = m1.get(y)[0];
  var dd = m1.get(y)[1];
  // Move the "pen" to the first point (x1, y1)
  context.moveTo(Number(aa), Number(bb));

  // Draw a line to the second point (x2, y2)
  context.lineTo(Number(cc), Number(dd));

  // Set the line color and width (optional)
  context.strokeStyle = "blue";
  context.lineWidth = 2;

  // Stroke the path to actually draw the line
  context.stroke();
  getdata(aa, bb, cc, dd, x, y);
}

const a_point = document.getElementById("aa");
const b_point = document.getElementById("bb");
const linedata = document.getElementById("find_points");
const btn = document.getElementById("distance");
btn.addEventListener("click", function () {
  var x = document.getElementById("aa").value;
  var y = document.getElementById("bb").value;
  console.log("called");

  if (x.trim() == "" || y.trim() == "") {
    // alert("value can neve be nulldssd555");
    document.getElementById("ab_data").innerHTML = "&#128578; SORRY";
    document.getElementById(
      "data_show"
    ).innerHTML = `PLEASE ENTER WRITE INFORMATION`;
  } else {
    //     var canvas = document.getElementById("myCanvas");
    //     var context = canvas.getContext("2d");

    //   clearscreen();
    one = 0;
    drawline(x, y);
  }
  document.getElementById("aa").value = "";
  document.getElementById("bb").value = "";
});

const addata = document.getElementById("add_points");
const btnadd = document.getElementById("points_sb");
btnadd.addEventListener("click", function (event) {
  event.preventDefault();
  var x = document.getElementById("x").value;
  var y = document.getElementById("y").value;
  if (x.trim() === "" || y.trim() === "") {
    alert("value can never be null");
    return;
  }

  document.getElementById("x").value = null;
  document.getElementById("y").value = null;
  const data = localStorage.getItem("myarray");
  const retrivedarray = JSON.parse(data);
  // console.log(typeof retrievedArray);
  retrivedarray.push([Number(x), Number(y)]);
  console.log(retrivedarray);
  localStorage.setItem("myarray", JSON.stringify(retrivedarray));
  const retrievedArray = JSON.parse(localStorage.getItem("main"));
  //of if we iterate our data simple localStorage.getItem then apply json
  calldata(retrievedArray[0], retrievedArray[1], retrievedArray[2]);
});

var form = document.getElementById("getcoordinates");
var button = document.getElementById("submitButton");
button.addEventListener("click", function (event) {
  event.preventDefault();
  x = document.getElementById("x_axis").value;
  y = document.getElementById("y_axis").value;
  radius = document.getElementById("radius").value;
  document.getElementById("x_axis").value = null;
  document.getElementById("y_axis").value = null;
  document.getElementById("radius").value = null;
  if (x.trim() === "" || y.trim() === "" || radius.trim() === "") {
    alert("value can never be null");
    return;
  }
  localStorage.setItem(
    "main",
    JSON.stringify([Number(x), Number(y), Number(radius)])
  );
  // alert("value is " + x + " " + y + " " + radius);
  if (x < 0 || x > 950 || y < 0 || y > 300) {
    alert("range out of coordinates");
  } else if (radius == 0) {
    alert("radius is never zero");
  }
  // else if (
  //   x + radius > 940 ||
  //   x - radius < 5 ||
  //   y + radius > 290 ||
  //   y - radius < 5
  // ) {
  //   alert("out of bounds data 2");
  // }
  else {
    calldata(Number(x), Number(y), Number(radius));
  }
});

// Get the canvas element and its 2D rendesring context
function calldata(x, y, radius) {
  var centerX = x;
  var centerY = y;
  var numCircles = radius;
  var circleRadius = radius;
  var rotationSpeed = 1; // in degrees per frame
  var rotationAngle = 0;

  function drawRadar() {
    one = 1;
    clearscreen();
    // Draw concentric circles
    for (var i = 0; i <= numCircles; i++) {
      var radius = i * numCircles; // Adjust the spacing between circles as needed
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      context.lineWidth = 3;
      context.strokeStyle = "green";
      context.stroke();
    }
    let n = 0;
    const storedValue = localStorage.getItem("map");

    // Check if the value is empty (null, undefined, or an empty string)

    if (
      storedValue === null ||
      storedValue === undefined ||
      storedValue === ""
    ) {
      var mapfromStorage = new Map();
    } else {
      // let random = JSON.parse(localStorage.getItem("myarray"));
      // const storedData = localStorage.getItem("map");
      // const next = JSON.parse(storedData);
      localStorage.removeItem("map");
      var mapfromStorage = new Map();
    }

    let random = JSON.parse(localStorage.getItem("myarray"));
    for (let i = 1; i < random.length; i++) {
      var ans = String.fromCharCode((n % 26) + "A".charCodeAt(0));
      n = n + 1;
      // n = Math.floor(  n /26);
      // retrievedmap.set(ans, random);
      mapfromStorage.set(ans, random[i]);
      drawRandomPoint(random[i][0], random[i][1], ans);
    }

    //set local items after renaming
    const maptostore = Array.from(mapfromStorage.entries());
    localStorage.setItem("map", JSON.stringify(maptostore));
    // localStorage.setItem("map", JSON.stringify(mapretrived));
    // Draw a rotating line
    context.beginPath();
    context.moveTo(centerX, centerY);
    var angleInRadians = (rotationAngle * Math.PI) / 180;
    var x = centerX + Math.cos(angleInRadians) * numCircles * numCircles;
    var y = centerY + Math.sin(angleInRadians) * numCircles * numCircles;
    context.lineTo(x, y);
    context.lineWidth = 2;
    context.strokeStyle = "red";
    context.stroke();

    //  Set the point color

    // Update the rotation angle
    rotationAngle += rotationSpeed;

    // Request the next frame
    // if(one=="1")requestAnimationFrame(drawRadar);
  }

  // Start the radar animation
  drawRadar();
}
function clearscreen() {
  //for clearing convas

  context.clearRect(0, 0, canvas.width, canvas.height);
  // console.log('sf')
}
