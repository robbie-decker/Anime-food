import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

const img = document.querySelector('img');

async function getPic(searchQuery){
    // Want to not have repeats
    const response = await fetch(`https://tenor.googleapis.com/v2/search?key=AIzaSyBn9j8LM5ivOjbmug-O5mgGlnRBaoK3m4Y&q=anime+food&limit=1&random=true`, {mode: 'cors'});
    console.log(response);
    const imgData = await response.json();
    console.log(imgData);
    img.src = imgData.results[0].media_formats.gif.url;
}
getPic();
const refreshPic = document.getElementById("refresh");
refreshPic.addEventListener("click", () => {
    // let searchText = document.getElementById("search").value;
    let searchText = "";
    getPic(searchText)
});

// setupCounter(document.querySelector('#counter'))
