'use-strict';

//DOM elements
var imageOne = document.getElementById('image1');
var imageTwo = document.getElementById('image2');
var imageThree = document.getElementById('image3');
var sectionEl = document.getElementById('threeImages');

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

//Render Random Image to DOM
function imageGenerator() {
  var pic1 = random();
  var pic2 = random();
  var pic3 = random();

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
}

imageGenerator();

//On Click - Event Handler
sectionEl.addEventListener('click', handleClick);

function handleClick(event) {
//  event.preventDefault();
  var clickedImage = event.target.title; //.value
  for (var i = 0; i < imageList.length; i++){
    if (clickedImage === imageList[i].title){
      imageList[i].clicked++;
    }
  }
  imageGenerator();
}

