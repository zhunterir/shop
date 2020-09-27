function slideAdjust(){
    if(slideWidth < 1000){
        slideSize = slideWidth /4;
        step=3;
    }
    else{
        slideSize = slideWidth /5;
        step= 3;
    }
}
let items = document.querySelectorAll(".c-slide-item");
let inner = document.querySelector(".c-slide-inner");
let slideWidth = parseFloat(getComputedStyle(inner).width);
let slideSize = 0;
let overflow = false;
let step= 0;
console.log(slideWidth);
slideAdjust();
let slideCurrentIndex= 0;
let slidePrevControl  = document.querySelector(".c-slide-prev-control");
let slideNextControl = document.querySelector(".c-slide-next-control");
let move = function(step){
    console.log('current', slideCurrentIndex);
    slideCurrentIndex+=step;
    if (slideCurrentIndex <0){
        slideCurrentIndex=0;      
    }
    else if (slideCurrentIndex >=items.length){
        slideCurrentIndex= items.length -1;
    }
    inner.style.transform = `translate(${slideSize*slideCurrentIndex}px,0px )`;
}
slidePrevControl.addEventListener("click",()=> move(+step));
slideNextControl.addEventListener("click", ()=> move(-step));
window.addEventListener("resize", ()=>{
    console.log(overflow);
    slideWidth = parseFloat(getComputedStyle(inner).width)
    if(slideWidth < 1000){
        slideSize = slideWidth /4;
        step=3;
    }
    else{
        slideSize = slideWidth /5;
        step= 3;
    }
}) 



