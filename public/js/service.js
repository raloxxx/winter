url = 'https://wintermdd.herokuapp.com/'


$("#prueba").click(function (e) {
    e.preventDefault()

    code = $('#code')
    description = $('#description')
    img = $('#img')
    $.ajax({
        method: "POST",
        url: url + "/product",
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





