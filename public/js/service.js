
$("#prueba").click(function (e) {
    e.preventDefault()

    code = $('#code')
    description = $('#description')
    img = $('#img')
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/product",
        data: {
            code: code.val(),
            description: description.val(),
            img: img.val()
        }
    }).done(function (msg) {
        alert("Producto guardado")
        code.val('')
        description.val('')
        img.val('')
    });
});





