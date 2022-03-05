
var n=prompt("bắt đầu chx(nhap 1 để bắt đầu ");
if(n==1)
{
for(;;)
{
    var n=prompt("nhap so muon doan: ");
    var ketqua=Math.floor(Math.random()*100);
    console.log(ketqua);
    if(n==ketqua)
    {
        console.log("OK BẠN LÀ NHẤT ");
        break;
    }
    if(n<ketqua)
    {
        var tam=ketqua-n;
        console.log("Shiệt số này nhỏ hơn "+ ketqua+" "+tam+" lần ");
        wait
    }
    if(n>ketqua)
    {
        var tam=n-ketqua;
        console.log("Shiệt số này lớn hơn "+ ketqua+" "+tam+" lần ");
    }
}}é