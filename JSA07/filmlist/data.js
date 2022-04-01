class show{

run() {for(var i=1;i<=film.length;i++)
{
    
     let item=document.getElementById('show');
     item.insertAdjacentHTML('afterbegin', "</br>");
     item.insertAdjacentHTML('afterbegin', `<div class="class"><hr> <h3>Bối cảnh: ${film[i].plot} <hr>
     Diễn viên: ${film[i].actors} <hr>
     Đạo diễn: ${film[i].director} <hr>
     Thể loại: ${film[i].genres} <hr>
     Thời lượng: ${film[i].runtime} phút <hr>
     Năm phát hành: ${film[i].year}</h3> <hr>
     <img src="${film[i].posterUrl}" alt="ảnh đã bị lỗi "/> <hr>
     <h1>${film[i].title}</h1></div>`);
}
}

}
