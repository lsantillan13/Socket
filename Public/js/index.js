/*Some imports*/
/*MY IO*/
 const socket = io();

 const first = document.getElementsByTagName('input')[0];
 const second = document.getElementsByTagName('input')[1];
 const third = document.getElementsByTagName('input')[2];

 socket.on('mensaje', (data) => {socket.emit('notificacion',`Conectado, ${data}`)});
 socket.on('atodos', (data) => {

    let table = document.getElementById('myTable');
    let tb = document.createElement('tbody');
         for (product of data){
        let tr = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdPrice = document.createElement('td');
        let tdPicture = document.createElement('td');
        tb.appendChild(tr);
        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        tr.appendChild(tdPicture);
        table.appendChild(tb);
        tdName.innerHTML =  `${product.title}`;
        tdPrice.innerHTML =  `${product.mensaje}`;
        tdPicture.innerHTML =  `${product.thumbnail}`;
        };
 });

 socket.on('devuelvo', (data) => {
     let p = document.getElementsByTagName('p')[0];
     p.innerHTML = data;
 })

 function enviar(){
     socket.emit('notificacion', document.getElementsByTagName('input')[0].value)
 };

 function cambio(valor){
     socket.emit('mitexto', valor);
 };