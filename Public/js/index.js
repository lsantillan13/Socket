/*MY IO*/
const socket = io();
/*When document.ready*/
window.onload = function(){
    /*Creation*/
    const tb = document.createElement('tbody');
    const tdName = document.createElement('td');
    const tdPrice = document.createElement('td');
    const tdPicture= document.createElement('td');
    
    /* DOM Manipulation */
    const first = document.getElementById('titleGuardar');
    const second = document.getElementById('price');
    const third = document.getElementById('thumbnail');
    const btn = document.getElementById('btn');
    const table = document.getElementById('myTable');
    /*Event Handler*/
        btn.addEventListener('click', function () {
            socket.emit('products:send', product = {
                "title": first.value,
                "price": second.value,
                "thumbnail": third.value
            });
        });
    socket.on('products:send', function (data){
        /*Inner*/
        tdName.innerHTML += `<p class="parrafo"> ${data.title} </p>`
        tdPrice.innerHTML += `<p class="parrafo"> ${data.price}</p´>`
        tdPicture.innerHTML += `<p class="parrafo"> <img src="${data.thumbnail}" alt="image_of_${data.title}" class="product_image"/> </p>`;
        for (product in data){
            const tr = document.createElement('tr');
            /*Append*/
            tb.appendChild(tr);
            tr.appendChild(tdName);
            tr.appendChild(tdPrice);
            tr.appendChild(tdPicture);
            table.appendChild(tb);            
        }
    });

    const output = document.getElementById('output');
    const actions = document.getElementById('actions');
    const username = document.getElementById('username');
    const message = document.getElementById('message');
    const myBtn = document.getElementById('button');

    myBtn.addEventListener('click', function(){
        socket.emit("message:send", {
            message: message.value,
            username: username.value
        });
    })

    message.addEventListener('keypress', function () {
        socket.emit('chat:typing', username.value);
    });

    socket.on('message:send', function (data){
        actions.innerHTML = ``;
        output.innerHTML += `<p> ${data.username} - ${data.message} </p>`
    });

    socket.on('chat:typing', (data) => {
        actions.innerHTML = `<p> <em>${data} está escribiendo...</em> </p>`
    })
    


};
/*  axios.post('/api/productos/guardar', {objects})
    .then(function (data) { console.log(data);})
    .catch(function (error) { console.log('Error', error);});
    objects.push({...myObject}); 
*/
