import './style.css'

// In a perfect world this would be its own React component

const img = document.querySelector('img');
const imgWrapper = document.getElementById('img_wrapper');
const limit = 20;
let gifs, next
let flavorText = ["Yummy!", "Delicious!", "Tasty!", "Delectable!", "Delightful!", "Oishi!", "Sugoi!", "Appetizing", "Scrumptious!"]

async function getGifBatch(next){
    // Want to not have repeats
    // We get ${limit} gifs and save the next value
    // Once we go through ${limit} gifs, fetch ${limit} more down the line using the next value
    const response = await fetch(`https://tenor.googleapis.com/v2/search?q=anime+food&key=AIzaSyBn9j8LM5ivOjbmug-O5mgGlnRBaoK3m4Y&limit=${limit}&pos=${next}&media_filter=gif`, {mode: 'cors'});
    console.log(response);
    return await response.json();
}

const refreshPic = document.getElementById("refresh");
refreshPic.addEventListener("click", () => {
  
  if(gifs.length != 0){
    changeGif();
  }
  else{
    getGifBatch(next)
    .then((gifData) => {
      gifs = gifData.results,
        next = gifData.next;
      changeGif();
    });
  }
});

function changeGif(){
  let gifIndex = randomIntFromInterval(0, (gifs.length - 1));
  img.src = gifs[gifIndex].media_formats.gif.url;
  gifs.splice(gifIndex, 1);
  addText();
}

// Randomly add some text to the image and then remove the text
function addText(){
  let imageText = document.createElement('p');
  imageText.textContent = flavorText[randomIntFromInterval(0, (flavorText.length - 1))];
  imageText.classList.add('centered');

  // Set left
  let left = randomIntFromInterval(1, 8) * 10;
  imageText.style.left = `${left}%`;

  // Randomly select if text will be on top or bottom
  let bottom_or_top = randomIntFromInterval(0,1);
  let top;
  // Append to bottom of image
  // Set right
  if(bottom_or_top == 0){
    top = randomIntFromInterval(75, 90);
    imageText.style.top = `${top}%`;
  }
  // Append to top of image
  else{
    top = randomIntFromInterval(5, 20);
    imageText.style.top = `${top}%`;
  }
  // Now add a sliding effect to the text
  imageText.style.transition = "transform 3s";
  imageText.style.transform = `translate(${-(left - 30)}%, ${-(top - 50)}%)`;
  imageText.style.offsetWidth = 0;
  imageText.style.overflow = "hidden";
  imgWrapper.appendChild(imageText)
  
  // Trigger a reflow to apply initial styles and start the transition
  imageText.getBoundingClientRect();
  imageText.style.transform = `translate(${left - 70}%, ${top - 50}%)`;

  // Remove the text
  setTimeout(() => {
    imgWrapper.removeChild(imageText);
  }, 3000);
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

getGifBatch(0)
.then((gifData) => {
  gifs = gifData.results,
    next = gifData.next;
  let gifIndex = randomIntFromInterval(0, (gifs.length - 1));
  img.src = gifs[gifIndex].media_formats.gif.url;
  gifs.splice(gifIndex, 1);
});