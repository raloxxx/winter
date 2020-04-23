$("#prueba").click(function (e) {
    e.preventDefault()

    code = $('#code')
    description = $('#description')

    let formData = new FormData(document.getElementById("frmProduct"));

    dataProduct = {
        code: code.val().toUpperCase(),
        description: description.val().toUpperCase(),
        img: ''
    }

    $.ajax({
        method: "POST",
        url: url + "/product",
        data: dataProduct
    }).done(function (msg) {
        $.ajax({
            method: "POST",
            url: url + "/product/img",
            data: formData,
            processData: false,
            contentType: false
        }).done(function (msg) {
            console.log(msg)
            alert("producto Guardado")
            code.val('')
            description.val('')
            code.val('')
            img = document.getElementById('blah')
            img.src = "https://via.placeholder.com/150"
        });
    });
    
});





