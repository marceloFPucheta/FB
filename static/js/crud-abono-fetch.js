const BASEURL = 'https://grupo9fono.pythonanywhere.com/';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de pelicula
 * @returns 
 */
async function saveAbono()
{
  const idAbono = document.querySelector('#id-movie').value;
  const nombre = document.querySelector('#title').value;
  const direccion = document.querySelector('#director').value;
  const fechaNac = document.querySelector('#release-date').value;
  const fotoCarnet = document.querySelector('#banner-form').value;

  //VALIDACION DE FORMULARIO
  if (!nombre || !direccion || !fechaNac || !fotoCarnet) {
    Swal.fire({
        title: 'Error!',
        text: 'Por favor completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    });
    return;
  }
  // Crea un objeto con los datos de la película
  const abonoData = {
      nombre: nombre,
      direccion: direccion,
      fecha_nac: fechaNac,
      foto_carnet: fotoCarnet,
  };

    
  let result = null;
  // Si hay un idMovie, realiza una petición PUT para actualizar la película existente
  if(idAbono!==""){
    result = await fetchData(`${BASEURL}/api/abono/${idAbono}`, 'PUT', abonoData);
  }else{
    // Si no hay idMovie, realiza una petición POST para crear una nueva película
    result = await fetchData(`${BASEURL}/api/abono/`, 'POST', abonoData);
  }
  
  const formAbono = document.querySelector('#form-movie');
  formAbono.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showAbonos();
}


/**
 * Funcion que permite crear un elemento <tr> para la tabla de peliculas
 * por medio del uso de template string de JS.
 */
async function showAbonos(){
  let abonos =  await fetchData(BASEURL+'/api/abono/', 'GET');
  const tableAbonos = document.querySelector('#list-table-movies tbody');
  tableAbonos.innerHTML='';
  abonos.forEach((abono,index) => {
    let tr = `<tr>
                  <td>${abono.nombre}</td>
                  <td>${abono.direccion}</td>
                  <td>${abono.fecha_nac}</td>
                  <td>
                      <img src="${abono.foto_carnet}" width="35%">
                  </td>
                  <td>
                      <button class="btn-cac" onclick='updateAbono(${abono.id_abono})'><i class="fa fa-pencil" ></button></i>
                      <button class="btn-cac" onclick='deleteAbono(${abono.id_abono})'><i class="fa fa-trash" ></button></i>
                  </td>
                </tr>`;
    tableAbonos.insertAdjacentHTML("beforeend",tr);
  });
}
  
/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deleteAbono(id){
  Swal.fire({
      title: "Esta seguro de eliminar el abonado?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
  }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await fetchData(`${BASEURL}/api/abono/${id}`, 'DELETE');
        showAbonos();
        Swal.fire(response.message, "", "success");
      }
  });
  showAbonos();
  
}


/**
 * Function que permite cargar el formulario con los datos de la pelicula 
 * para su edición
 * @param {number} id Id de la pelicula que se quiere editar
 */
async function updateAbono(id){
  //Buscamos en el servidor la pelicula de acuerdo al id
  let response = await fetchData(`${BASEURL}/api/abono/${id}`, 'GET');
  const idAbono = document.querySelector('#id-movie');
  const nombre = document.querySelector('#title');
  const direccion = document.querySelector('#director');
  const fechaNac = document.querySelector('#release-date');
  const fotoCarnet = document.querySelector('#banner-form');
  
  idAbono.value = response.id_abono;
  nombre.value = response.nombre;
  direccion.value = response.direccion;
  fechaNac.value = response.fecha_nac;
  fotoCarnet.value = response.foto_carnet;
}
  
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
  const btnSaveAbono = document.querySelector('#btn-save-movie');
  //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
  btnSaveAbono.addEventListener('click',saveAbono);
  showAbonos();
});