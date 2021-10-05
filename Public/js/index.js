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

    /*Primer formulario*/
    myBtn.addEventListener('click', function(){
        socket.emit("message:send", {
            message: message.value,
            username: username.value
        });
    })

    /*User: está escribiendo...*/
    message.addEventListener('keypress', function () {
        socket.emit('chat:typing', username.value);
        
    });
    /*FECHA Y HORA*/
    const timeNow = new Date();
    function getHour(){
        const hours = timeNow.getHours().toString().length < 2 ? "0" + timeNow.getHours() : timeNow.getHours();
        const minutes = timeNow.getMinutes().toString().length < 2 ? "0" + timeNow.getMinutes() : timeNow.getMinutes();
        const secs =  timeNow.getSeconds().toString().length < 2 ? "0" + timeNow.getSeconds() :  timeNow.getSeconds();

        let mainTime = `${hours}:${minutes}:${secs}`;
        return mainTime;
    };

    function getDate(){
        const month = timeNow.getMonth();
        const days = timeNow.getDate();
        const year = timeNow.getFullYear();
        const mainDate = `${days}/${month}/${year}`;
    }

    /* Mensaje */
    let fechaActual  = new Date();
    const dateMsg = ` ${fechaActual.getDate()}/${fechaActual.getMonth()}/${fechaActual.getFullYear()}`;
    
    socket.on('message:send', function (data){
        actions.innerHTML = ``;
        output.innerHTML += `<p> <strong>${data.username}</strong> <i class="notItalic">[${dateMsg} ${getHour()}]</i> : <i>${data.message}</i> </p>`;
    });

    /*User: está escribiendo...*/
    socket.on('chat:typing', (data) => {
        actions.innerHTML = `<p> <em>${data} está escribiendo...</em> </p>`
    });
    
};
/*  axios.post('/api/productos/guardar', {objects})
    .then(function (data) { console.log(data);})
    .catch(function (error) { console.log('Error', error);});
    objects.push({...myObject}); 
*/
