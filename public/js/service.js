$("#prueba").click(function (e) {
    e.preventDefault()

    code = $('#code')
    description = $('#description')

    let formData = new FormData(document.getElementById("frmProduct"));

    dataProduct = {
        code: code.val(),
        description: description.val(),
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
        });
    });
    
});





