'use-strict';

// DOM elements
var imageOne = document.getElementById('image1');
var imageTwo = document.getElementById('image2');
var imageThree = document.getElementById('image3');
var sectionEl = document.getElementById('threeImages');
var resultsEl = document.getElementById('results-items');

// Click Counter & Memory
var clickCount = 0;
var currentMem = [null, null, null];
var stagingMem = [null, null, null]; // trial random image ids go here to be tested against currentMem

// Utility Arrays
var imageList = [];
var labelArray = [];
var clickedData = [];
var viewedData = [];

// New Image Constructor
function NewImage(src, alt, title) {
  this.src = src;
  this.alt = alt;
  this.title = title;
  this.viewed = 0;
  this.clicked = 0;
  imageList.push(this);
}

// Create New Image Objects Here
new NewImage('./images/bag.jpg', 'cool bag', 'bag');
new NewImage('./images/banana.jpg', 'cool banana', 'banana');
new NewImage('./images/bathroom.jpg', 'cool bathroom', 'bathroom');
new NewImage('./images/boots.jpg', 'cool boots', 'boots');
new NewImage('./images/breakfast.jpg', 'cool breakfast', 'breakfast');
new NewImage('./images/bubblegum.jpg', 'cool bubblegum', 'bubblegum');
new NewImage('./images/chair.jpg', 'cool chair', 'chair');
new NewImage('./images/cthulhu.jpg', 'cool cthulhu', 'cthulhu');
new NewImage('./images/dog-duck.jpg', 'cool dog duck', 'dog-duck');
new NewImage('./images/dragon.jpg', 'cool dragon', 'dragon');
new NewImage('./images/pen.jpg', 'cool pen', 'pen');
new NewImage('./images/pet-sweep.jpg', 'cool pet sweep', 'pet-sweep');
new NewImage('./images/scissors.jpg', 'cool scissors', 'scissors'); // don't run with scissors
new NewImage('./images/shark.jpg', 'cool shark', 'shark');
new NewImage('./images/sweep.png', 'cool sweep', 'sweep');
new NewImage('./images/tauntaun.jpg', 'cool tauntaun', 'tauntaun');
new NewImage('./images/unicorn.jpg', 'cool unicorn', 'unicorn');
new NewImage('./images/usb.gif', 'cool usb', 'usb');
new NewImage('./images/water-can.jpg', 'cool water can', 'water-can');
new NewImage('./images/wine-glass.jpg', 'cool wine glass', 'wine-glass');

// Random number generator --> returns random index of imageList
function random() {
  var max = imageList.length;
  return Math.floor(Math.random() * max);
}

function memory() {
  stagingMem.pop(); // removes the 3 current elements in stagingMem
  stagingMem.pop();
  stagingMem.pop();
  stagingMem.push(random(), random(), random()); // adds 3 random ids to stagingMem
}

function checkIfUnique() {
  if (stagingMem[0] !== stagingMem[1] && stagingMem[0] !== stagingMem[2] && stagingMem[1] !== stagingMem[2]) {
    return true;
  }
  return false;
}

function checkIfNew() {
  for (var i = 0; i < currentMem.length; i++) {
    for (var j = 0; j < stagingMem.length; j++) {
      if (currentMem[i] === stagingMem[j]) {
        return false;
      }
    }
  }
  return true;
}

// Render Random Image to DOM that satisfies randomness conditions
function imageGenerator() {
  // I want to generate 3 unique image ids and 3 different image ids

  // Memory init funciton. stages 3 random image ids
  memory();

  // Generates new image ids until both new and unique
  while (checkIfNew() === false || checkIfUnique() === false) {
    memory();
  }

  //currentMem values are assigned to pic variables
  var pic1 = stagingMem[0];
  var pic2 = stagingMem[1];
  var pic3 = stagingMem[2];

  //DOM manip
  imageOne.src = imageList[pic1].src; // dynamically assign img src to DOM
  imageOne.alt = imageList[pic1].alt; // dynamically assign img alt to DOM
  imageOne.title = imageList[pic1].title; // dynamically assign img title to DOM
  imageList[pic1].viewed++; // increments viewed value by 1

  imageTwo.src = imageList[pic2].src;
  imageTwo.alt = imageList[pic2].alt;
  imageTwo.title = imageList[pic2].title;
  imageList[pic2].viewed++;

  imageThree.src = imageList[pic3].src;
  imageThree.alt = imageList[pic3].alt;
  imageThree.title = imageList[pic3].title;
  imageList[pic3].viewed++;

  // Moves stagingMem to currentMem
  currentMem.pop(); // removes all 3 elements in currentMem
  currentMem.pop();
  currentMem.pop();
  for (var i = 0; i < stagingMem.length; i++) {
    currentMem.push(stagingMem[i]); // pushes each element of stagingMem (which has been rendered) to currentMem
  }
}


//Init Image Generation
imageGenerator();

//On Click - Event Handler
sectionEl.addEventListener('click', handleClick);
function handleClick(event) {
  var clickedImage = event.target.title;
  for (var i = 0; i < imageList.length; i++){
    if (clickedImage === imageList[i].title){
      imageList[i].clicked++;
    }
  }
  imageGenerator();
  clickCount++;
  if (clickCount === 25) {
    resultsGenerator();
    sectionEl.removeEventListener('click', handleClick);
  }
}

//Results Display after 25 Clicks
function resultsGenerator(){

  //Creates <canvas> element with attributes
  var chartSelection = document.getElementById('chartSection');
  var chartEl = document.createElement('canvas');
  chartEl.setAttribute('id', 'myChart');
  chartEl.setAttribute('width', '1100');
  chartEl.setAttribute('height', '300');
  chartSelection.appendChild(chartEl);

  //Pulls data from attributes of imageList objects
  for (var i = 0; i < imageList.length; i++) {
    labelArray.push(imageList[i].title); // title data for chart
    clickedData.push(imageList[i].clicked); // clicked data for chart
    viewedData.push(imageList[i].viewed); // viewed data for chart
    var liEl = document.createElement('li');
    var percent = 0;
    if (isNaN(Math.round((imageList[i].clicked / imageList[i].viewed) * 100))) {
      percent = 0;
    } else {
      percent = Math.round((imageList[i].clicked / imageList[i].viewed) * 100);
    }
    liEl.textContent = `${imageList[i].title} was viewed ${imageList[i].viewed} times, clicked ${imageList[i].clicked} times, click rate was ${percent}%.`;
    resultsEl.appendChild(liEl);
  }

  //Creates bar chart with created <canvas> element
  renderChart();
}

//Chart.js
function renderChart() {
  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelArray,
      datasets:
      [
        {
          label: 'times clicked',
          data: clickedData,
          backgroundColor: 'blue',
        },
        {
          label: 'times viewed',
          data: viewedData,
          backgroundColor: 'yellow',
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

}

//Chart.js
function renderChart() {
  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartArray,
      datasets: [{
        label: '# of Votes',
        data: chartData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}


