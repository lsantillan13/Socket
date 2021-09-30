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
    let i = 0;
    const Btn = document.getElementById('enviar');
    const newArr = [];

    for (product of data){    
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdPrice = document.createElement('td');
        const tdPicture = document.createElement('td');
        console.log(this.product.product)
        // tdName.innerHTML =  `${this.product.product[i]["title"]}`;
        // tdPrice.innerHTML =  `$${this.product.product[i]["price"]}`;
        // tdPicture.innerHTML =  `${this.product.product[i]["thumbnail"]}`
        tb.appendChild(tr);
        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        tr.appendChild(tdPicture);
        table.appendChild(tb);  }
        

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