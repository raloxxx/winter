let data = {
    name: '',
    items: []
}

// let url = 'https://wintermdd.herokuapp.com'
let url = 'http://localhost:3000'

cant = document.getElementById('cant')

if (localStorage.getItem("car") !== null) {
    data = JSON.parse(localStorage.getItem('car'))
}

cant.innerHTML = data.items.length

listProducts()

$('a[data-toggle="list"]').on('shown.bs.tab', function (e) {

})

function select(e) {
    child = document.getElementsByName('elementa')[e].childNodes


    child1 = child[1].textContent.split(" ")[2]
    child2 = child[2].textContent.split(" ")[2]
    child3 = child[3].textContent.split(" ")[2]
    child4 = child[4].textContent.split(" ")[2]


    document.getElementById("id-e").value = child1
    document.getElementById("description-e").value = child2
    document.getElementById("pack-e").value = child3
    document.getElementById("unit-e").value = child4

}

function listProducts() {
    list = document.getElementById("list")
    newElement = ''
    data.items.forEach(element => {
        newElement = newElement + '<a onclick="select(' + element.id + ')" data-toggle="modal" name="elementa" data-target="#staticBackdrop" class="list-group-item list-group-item-action"> <p class="mb-1"> codigo: ' + element.id + '</p><p class="mb-1"> descripcion: ' + element.description + '</p><p class="mb-1"> pacquetes: ' + element.pack + '</p><p class="mb-1"> unidades: ' + element.unit + '</p></a>'

    });

    list.innerHTML = newElement
    console.log(list)
}

function setName() {
    data.name = document.getElementById('name').value
    localStorage.setItem('car', JSON.stringify(data))
    window.location = url + "/home"
}


function selectProduct(e) {
    e.preventDefault()

    const _id = e.target.attributes[1].value

    $.ajax({
        method: "GET",
        url: url + "/home/" + _id
    }).done(function (msg) {
        console.log(msg)
    });
}


function setItem(e) {
    e.preventDefault()

    id = data.items.length
    description = 'document.getElementById("description")'
    pack = document.getElementById('pack').value
    unit = document.getElementById('unit').value


    data.items.push({
        id: id,
        description: description,
        pack: pack,
        unit: unit
    })
    cant.innerHTML = data.items.length
    localStorage.setItem('car', JSON.stringify(data))
}

function changeFile (e) {
    console.log("aqui")
    img = document.getElementById('blah')
    // Creamos el objeto de la clase FileReader
    let reader = new FileReader();

    // Leemos el archivo subido y se lo pasamos a nuestro fileReader
    reader.readAsDataURL(e.target.files[0]);

    // Le decimos que cuando este listo ejecute el código interno
    reader.onload = function () {
        console.log("aqui")
        img.src = reader.result;

    };
}

