const dark= localStorage.getItem("dark");
if(dark==null ) {dark=false}
const input = document.querySelector("[name=dark]");
input.checked = darkmode;
input.onchange = function()
{
    localStorage.setItem("dark",input.checked);
}
