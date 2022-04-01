function Check(){
    var name_log = document.getElementById("name_log");
    var pass_log = document.getElementById("pass_log");
}
function Creat(){
    let mail_sign = document.getElementById("mail_sign");
    let name_sign= document.getElementById("name_sign");
    let pass_sign = document.getElementById("pass_sign");
    let pass_sign_copy= document.getElementById("pass_sign_copy");
    if( name_sign.value==""||mail_sign.value=="" || pass_sign.value=="" || pass_sign_copy.value=="")
    {
        alert("THiếu thông tin r ");
    } else{
        if(pass_sign.value== pass_sign_copy.value)
        {let acc= {
            "mail": mail_sign.value,
            "name": name_sign.value,
            "pass": pass_sign.value
        }
        localStorage.setItem(new Date().getTime(), JSON.stringify(acc));


    }
    else{
        alert("Pass không giống r ");
    }
    }
}
