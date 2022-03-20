let user = [
    {
      name: "minhvuhoang",
      pass: "123456"
    },
    {
      name: "hungnguyen",
      pass: "123456"
    },
    {
      name: "baolam",
      pass: "123456"
    }
  ];
  let taikhoan = document.querySelector("#name_log");
  let matkhau = document.querySelector("#pas_log");
  function Check() {
    for (let i = 0; i <= user.length; i++) {
      if (taikhoan.value == user[i].name && matkhau.value == user[i].pass) {
        window.location.replace("");
        alert("Link hỏng r nha");
        break;
      }
    }
}
let taikhoanmoi =document.querySelector("#name_sign");
let pasmoi=document.querySelector("#pas_sign");
let xacnhanpas =document.querySelector("#pas_sign_copy");
function Creat(){
    for(var i=0; i<=user.length;i++)
    {
        if(taikhoanmoi.length <8)
        {
            alert("Tên ko phù hợp");
            break;
        }
        if(taikhoanmoi.value==user[i].name)
        {
            alert("Tên đã tồn tại");
            break;
        }
        if(pasmoi!=xacnhanpas)
        {
            arlert("Mật khẩu xác nhận không trùng nhau");
            break;
        }
        if(i>=user.length && pasmoi==xacnhanpas)
        {
            alert("success");
            let newacc= {
                name:taikhoanmoi,
                pass:pasmoi
            }
            user.push(newacc);
        }
    }
}