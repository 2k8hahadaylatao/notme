const button = document.querySelector("#button"); 
const icon = document.querySelector("#button > i"); 
const audio = document.querySelector("audio"); 
let progress = document.querySelector("progress");
const slime = document.querySelector("#slime");
button.addEventListener("click", () => { 
    setInterval(() => {
        progress.value+=2;
        console.log( progress.value);
    }, 100);

    let j=1;
setInterval(()=>{
    j++;
    let numberj= j.toString();
slime.style.backgroundImage= "url("+ "/images/menu/slimemenu" + numberj  +".png"+")";
if(j==3){j=0;}
},500)
    
    if (audio.paused) { 
    audio.volume = 0.5; 
    audio.play(); 
    icon.classList.remove('fa fa-volume-up'); icon.classList.add('fa fa-volume-off'); 
} 
setTimeout(()=>{    window.open ("http://127.0.0.1:5500/index.html")},5200)
});
if(audio.volume >=0.2)
{
    audio.volume=0.2;
}
let i=0;
setInterval(()=>{
    i++;
    let number= i.toString();
document.body.style.backgroundImage = "url("+ "/images/menu/mainmenu" + number  +".png"+")";
if(i==2){i=-1;}
},400)

