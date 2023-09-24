import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

// In a perfect world this would be its own React component

const img = document.querySelector('img');
const limit = 20;
let gifs, next

async function getGifBatch(next){
    // Want to not have repeats
    // We get ${limit} gifs and save the next value
    // Once we go through ${limit} gifs, fetch ${limit} more down the line
    // const response = await fetch(`https://tenor.googleapis.com/v2/search?key=AIzaSyBn9j8LM5ivOjbmug-O5mgGlnRBaoK3m4Y&q=anime+food&limit=1&random=true`, {mode: 'cors'});
    const response = await fetch(`https://tenor.googleapis.com/v2/search?q=anime+food&key=AIzaSyBn9j8LM5ivOjbmug-O5mgGlnRBaoK3m4Y&limit=${limit}&pos=${next}&media_filter=gif`, {mode: 'cors'});
    console.log(response);
    return await response.json();
    // return imgData
}

const refreshPic = document.getElementById("refresh");
refreshPic.addEventListener("click", () => {
  // let searchText = document.getElementById("search").value;
  
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
  let gifIndex = getRandomInt(gifs.length);
  img.src = gifs[gifIndex].media_formats.gif.url;
  gifs.splice(gifIndex, 1);
}

function getRandomInt(max){
  return Math.floor(Math.random() * max);
}

// setupCounter(document.querySelector('#counter'))
getGifBatch(0)
.then((gifData) => {
  gifs = gifData.results,
    next = gifData.next;
  changeGif();
});