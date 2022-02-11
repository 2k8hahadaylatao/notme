$(document).ready(function () {
  $("#eye").click(function () {
    $(this).toggleClass("open");
    $(this).children("i").toggleClass("far fa-eye-slash far fa-eye");
    if ($(this).hasClass("open")) {
      $(this).prev().attr("type", "text");
    } else {
      $(this).prev().attr("type", "password");
    }
  });
}); //chạy con mắt, mật khẩu;

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
let taikhoan = document.querySelector("#tk");
let matkhau = document.querySelector("#mk");
function Redirect() {
  console.log("Đăng nhập");
  for (let i = 0; i <= user.length; i++) {
    if (taikhoan.value == user[i].name && matkhau.value == user[i].pass) {
      window.location.replace("http://127.0.0.1:5500/list.html");
      break;
    }
    /* else
        {
            alert("Sai tên tài khoản hoặc mật khẩu đc cung cấp");
        }*/
  }
} //chuyển hướng trang web
