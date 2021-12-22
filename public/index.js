// Inicializamos una constante para poder utilizar los sockets desde el cliente
const socket = io();


/////////////// productos /////////////////

socket.on("newProduct", newProduct => {
    renderProduct(newProduct)
})

function renderProduct(newProduct) {
        $("#product-table").append(
            `<tr><th scope="row">${newProduct.id}</th>
                <td>${newProduct.title}</td>
                <td>$${newProduct.price}</td>
                <td><img style="width:50px;" src="${newProduct.thumbnail}" alt=""></td>
            </tr>`)
}

$("#productForm").submit(e => {
    e.preventDefault();
    const productData = {
        title: $("#title")[0].value,
        price: $("#price")[0].value,
        thumbnail: $("#thumbnail")[0].value
    }
 
    $("#title")[0].value = "";
    $("#price")[0].value = "";
    $("#thumbnail")[0].value = "";
    
    socket.emit('newProduct', productData)
})

socket.on("updatedList", productList => {
    console.log('lista de productos', productList);
})





/////////////// chat /////////////////

// cuando se conecte un usuario verá la lista de mensajes actual
socket.on("messages", messages => {
    renderChat(messages)
})

function renderChat(messages) {
    messages.forEach(message => {
        $("#messages").append(
            `<span id="email">${message.email}</span>
            <span id="date">${message.date}</span>
            <span id="data">: ${message.data}</span>
            <br>`)
    })
}

$("#chatForm").submit(e => {
    e.preventDefault();
    const message = {
        email: $("#email").val(),
        date: `[${new Date().toLocaleString()}]`,
        data: $("#msg").val()
    }
    
    $("#msg")[0].value = "";
    
    socket.emit("newMessage", message);
})