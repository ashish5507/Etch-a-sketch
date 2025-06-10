let pixels;
let colourName;
let rainbow = false;
let rainbowInterval;
const rgbToName = {
    "rgb(238, 130, 238)": "violet",
    "rgb(75, 0, 130)": "indigo",
    "rgb(0, 0, 255)": "blue",
    "rgb(0, 128, 0)": "green",
    "rgb(255, 255, 0)": "yellow",
    "rgb(255, 165, 0)": "orange",
    "rgb(255, 0, 0)": "red",
    "rgb(0, 255, 255)": "cyan"
};
const submitbtn = document.querySelector("#submit");
const input = document.querySelector("#inpt");
let sketchGrid = document.querySelector("#grid");
submitbtn.addEventListener("click",function(){
    pixels = parseInt(input.value);
    if( isNaN(pixels) || pixels <= 0 || pixels > 100){
        alert("Enter a valid value between 0 and 100");
        return;
    }
    sketchGrid.textContent = "";
    const num = pixels*pixels;
    console.log(num);
    const length = Math.floor(900/pixels);
    console.log(length);
    for(let i = 0; i<num; i++){
        const div = document.createElement("div");
        div.classList.add("cubes");
        div.style.height = `${100/pixels}%`;
        div.style.width = `${100/pixels}%`;
        div.style.boxSizing = "border-box";
        div.style.border = "1px solid rgba(0, 0, 0, 0.05)";
        sketchGrid.appendChild(div);
    }
})

const clr = document.querySelector("#colors");
clr.addEventListener("click",function(elem){
    const button = elem.target.closest("button");
    if(!button){
        return;
    }
    const style = window.getComputedStyle(button);
    let colour = style.backgroundColor;
    colourName = rgbToName[colour];
})

sketchGrid.addEventListener("mouseover",function(elem){
    const hover = elem.target;
    if(hover.classList.contains("cubes") && colourName){
        hover.style.backgroundColor = colourName;
        hover.classList.add("coloured");
    }
})
const reset = document.getElementById("reset");
reset.addEventListener("click",function(){
    sketchGrid.textContent = "";
    input.value = "";
})

const clear = document.querySelector("#clear");
clear.addEventListener("click",function(){
    const changebg = document.getElementsByClassName("coloured");
    const size = changebg.length;
    for(let i = 0; i<size; i++){
        changebg[i].style.backgroundColor = "white";
    }
})

const random = document.querySelector("#random");
random.addEventListener("click",function(){
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    colourName = `rgb(${r},${g},${b})`;
})

const changing = document.querySelector("#rgb");
changing.addEventListener("click",function(){
    if(!rainbow){
        rainbow = true;
        rainbowInterval = setInterval(() => {
            const r = Math.floor(Math.random()*256);
            const g = Math.floor(Math.random()*256);
            const b = Math.floor(Math.random()*256);
            colourName = `rgb(${r},${g},${b})`;
        },100)

        changing.textContent = "Stop";
    }
    else{
        rainbow = false;
        clearInterval(rainbowInterval);
        changing.textContent = "Rainbow";
        colourName = "white";
    }
})