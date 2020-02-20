# Lab 11
Lab 11 Bus Mall
- by Adam Owada

### About
Click on one of three displayed images. After 25 selections, a results sidebar will display the number of times an image was displayed, the number of times clicked, and the percentage of times clicked when displayed. Additionally, a grouped bar chart showing the clicked and viewed data per image is displayed underneath.

View the deployed website at: https://adamowada.github.io/bus-mall/

### Dev History
Day 1
- set up initial scaffold
- wireframed site w/ placeholders
- constructor function
- create new img objects
- math.random
- render random img to dom
- add event listener for clicks
- after 25 clicks, results are displayed
- added randomness constraints:
  - 3 images must be unique
  - none of the currently displayed images may repeat from click to click
- removed event listener once results are displayed

Day 2
- minor tweaks to styling and readme.md
- linked up Chart.js
- uses dom manipulation to add canvas element to index.html
- grouped chart is created with clickedData array and viewedData array
- changed colors to blue and yellow for contrast

### Credit 
Thank you to Jacob Budin's answer on https://www.stackoverflow.com/questions/28180871/grouped-bar-charts-in-chart-js in which he describes how to create grouped bar charts in chart.js