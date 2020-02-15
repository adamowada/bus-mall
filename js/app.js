'use-strict';

//DOM elements
var imageOne = document.getElementById('image1');
var imageTwo = document.getElementById('image2');
var imageThree = document.getElementById('image3');

//Image Array
var imageList = [];

//New Image Constructor
function NewImage(src, alt, title) {
  this.src = src;
  this.alt = alt;
  this.title = title;
  this.displayed = 0;
  this.clicked = 0;
  imageList.push(this);
}

//Create New Image Objects Here
new NewImage('./images/bag.jpg', 'cool bag', 'bag');

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
  imageTwo.src = imageList[pic2].src;
  imageThree.src = imageList[pic3].src;
}

imageGenerator();