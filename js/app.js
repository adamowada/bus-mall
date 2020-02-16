'use-strict';

//DOM elements
var imageOne = document.getElementById('image1');
var imageTwo = document.getElementById('image2');
var imageThree = document.getElementById('image3');
var sectionEl = document.getElementById('threeImages');
var resultsEl = document.getElementById('results-items');

//Click Counter & Memory
var clickCount = 0;
var oldMem = [null, null, null];
var currentMem = [null, null, null];

//Image Array
var imageList = [];

//New Image Constructor
function NewImage(src, alt, title) {
  this.src = src;
  this.alt = alt;
  this.title = title;
  this.viewed = 0;
  this.clicked = 0;
  imageList.push(this);
}

//Create New Image Objects Here
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
  currentMem.pop();
  currentMem.pop();
  currentMem.pop();
  currentMem.push(random(), random(), random());
}

//Render Random Image to DOM that satisfies conditions
function imageGenerator() {
  // var pass = false;
  // do {
  //   memory();
  //   for (var i = 0; i < oldMem.length; i++) {
  //     for (var j = 0; j < currentMem.length; j++) {
  //       if (oldMem[i] === currentMem[j]) {
  //         pass = false;
  //       }
  //     }
  //   }
  // } while (pass === false);

  // it's broken : (

  memory();
  while (currentMem[0] === currentMem[1] || currentMem[0] === currentMem[2] || currentMem[1] === currentMem[2]){
    memory();
  }

  var pic1 = currentMem[0];
  var pic2 = currentMem[1];
  var pic3 = currentMem[2];

  imageOne.src = imageList[pic1].src;
  imageOne.alt = imageList[pic1].alt;
  imageOne.title = imageList[pic1].title;
  imageList[pic1].viewed++;

  imageTwo.src = imageList[pic2].src;
  imageTwo.alt = imageList[pic2].alt;
  imageTwo.title = imageList[pic2].title;
  imageList[pic2].viewed++;

  imageThree.src = imageList[pic3].src;
  imageThree.alt = imageList[pic3].alt;
  imageThree.title = imageList[pic3].title;
  imageList[pic3].viewed++;

  //Remomves Old Memory, Adds New Pics to Memory
  oldMem.pop();
  oldMem.pop();
  oldMem.pop();
  oldMem.push(pic1, pic2, pic3);
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
  }
}

//Results Display after 25 Clicks
function resultsGenerator(){
  for (var i = 0; i < imageList.length; i++) {
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
}
