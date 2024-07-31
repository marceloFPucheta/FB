const destinos = [
    {
        "destino":"Mar del Plata",
        "salida":"Liniers"
    },
    {
        "destino":"San Clemente",
        "salida":"Moron"
    },
    {
        "destino":"Las Toninas",
        "salida":"Moron"
    },
    {
        "destino":"Santa Teresita",
        "salida":"Moron"
    },
    {
        "destino":"Mar del Tuyu",
        "salida":"Moron"
    },
    {
        "destino":"La Lucila del Mar",
        "salida":"Liniers"
    },
    {
        "destino":"San Bernardo",
        "salida":"Liniers"
    },
    {
        "destino":"Mar del Plata",
        "salida":"Liniers"
    },
    {
        "destino":"Cordoba",
        "salida":"Moron"
    },
    {
        "destino":"Rosario",
        "salida":"Moron"
    },

]

/*VISUALIZACION PASAJES*/ 
function mostrarPasajes(destinos){
    let articulo=" ";
    destinos.forEach(p => {
        articulo +=`
        <tr id="serie">
            <td class="table-checkbox">
                <input type="radio" name="seleccionar" onclick="buscarSeleccionado()">
            </td>
            <td id="">${p.destino}</td>
            <td>${p.salida}</td>
            <td>
                <select id="tipoViaje" name="tipoViaje" required>
                    <option value="">Seleccione</option>
                    <option value="Ida">Ida</option>
                    <option value="IdaVuelta">Ida y vuelta</option>
                </select>
            </td>
            <td>
                <input type="number" id="cantPasajes" name="cantPasajes" min="1" max="10" value="1"/>
            </td>
        </tr>        
        `;                        
    });

    let contenedorArticulos = document.getElementById("tablaPasajesCuerpo");

    contenedorArticulos.innerHTML = articulo;
}

document.addEventListener("DOMContentLoaded", function() {
    mostrarPasajes(destinos);
});


/*document.addEventListener("DOMContentLoaded", mostrarPasajes(destinos));*/

/*############################################################################################*/
function buscarPasaje(){
            var pasajeABuscar = document.getElementById("pasajeABuscar").value.toString().toLowerCase();
            var cuerpoTabla = document.getElementById("tablaPasajesCuerpo")
            var filasTabla = cuerpoTabla.getElementsByTagName("tr")

            for(let i = 0; i < filasTabla.length; i++){
                let textoConsulta = filasTabla[i].cells[1].textContent.toString().toLowerCase();
                
                if(textoConsulta.indexOf(pasajeABuscar) === -1){
                    filasTabla[i].style.visibility = "collapse";
                }else{
                    filasTabla[i].style.visibility = "";
                }
            }
        }

        function buscarSeleccionado(){
            let coleccionRadios = document.getElementsByName("seleccionar")
            
            for (var i = 0; i < coleccionRadios.length; i++) {
                if (coleccionRadios[i].checked) {
                    var filaSeleccionada = coleccionRadios[i].closest("tr");
                    /*console.log(filaSeleccionada.cells[1].textContent)*/
                }
            }
            return filaSeleccionada
        }

        function comprarPasaje(){
            var filaElejida = buscarSeleccionado()

            if(filaElejida != null){
                var destino = filaElejida.cells[1].textContent;
                var salida = filaElejida.cells[2].textContent;
                var tipoViaje = filaElejida.cells[3].getElementsByTagName("select")[0].value;
                var cantPasajes = filaElejida.cells[4].getElementsByTagName("input")[0].value;
        
                alert("Compraste el pasaje:\n" +
                      "Destino: " + destino + "\n" +
                      "Salida: " + salida + "\n" +
                      "Tipo de Viaje: " + tipoViaje + "\n" +
                      "Cantidad de Pasajes: " + cantPasajes);
            }else{
                alert("Por favor, selecciona una pasaje para comprar.");
            }
        }