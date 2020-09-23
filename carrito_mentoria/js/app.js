//Variables
const carritos= document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn= document.getElementById('vaciar-carrito');


//Event listeners
cargarEventListeners();

function cargarEventListeners(){
    //Dispara cuando se presiona "Agregar Carrito"
    cursos.addEventListener('click', comprarCurso);

    //cuando se elimina un curso del carrito
    carritos.addEventListener('click', eliminarCurso);

    //al vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    //cargar localStorage al cargar web
    //Nota: recordar, con event DOMContentLoaded,se usa
    //document.addEvent... no const de id´s o tag html
    document.addEventListener('DOMContentLoaded',cargarCursosCarrito)
}




// Funciones
//funcion que añade el curso al carrito
function comprarCurso(e){
    e.preventDefault();
    //Delegation para agregar carrito
    //DUDA
    //por que me funciona el delegation en e.target.classList.contains('agregar-carrito')
    // y no me funciona e.target.className='agregar-carrito'
    if(e.target.classList.contains('agregar-carrito')){
        const curso= e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
}
//leer los datos del curso
function leerDatosCurso(curso){
    const infoCurso={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    //insertar carrito en dom
    insertarCarrito(infoCurso);

    
}
//insertar carrito en dom
function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML= `
    <td>
        <img src="${curso.imagen}" width="100">
    </td>
    <td>
        ${curso.titulo}
    </td>
    <td>
        ${curso.precio}
    </td>
    <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
    `;
    listaCursos.appendChild(row);

    //guardar en localStorage
    guardarCursoLS(curso);

}

//eliminar curso del carrito en el dom
function eliminarCurso(e){
    e.preventDefault;
    
    let cursoId, curso;
    if(e.target.classList.contains('borrar-curso')) {
        
        curso= e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
        e.target.parentElement.parentElement.remove();
    }

    //eliminar curso de LS
    eliminarCursoLS(cursoId);
}

//vaciar carrito

function vaciarCarrito(e){
    e.preventDefault(); 
    while(listaCursos.firstChild){
        listaCursos.firstChild.remove();
        //o listaCursos.removeChild(listaCursos.firstchild)
    }
    vaciarCarritoLS();
    return false;
}

//guardar curso en LocalStorage
function guardarCursoLS(curso){
    //recupera valor del LS vacio o lleno
    let cursos = obtenerCursosLS();
    //curso seleccionado se arregla al array
    cursos.push(curso);
    localStorage.setItem('cursos', JSON.stringify(cursos));
}

//obtiene los cursos almacenados en LS
//anotacion:el nombre del array del localstorage no admite nombre con caracter mayusculas
 function obtenerCursosLS(){
     let cursosLS;
     if(localStorage.getItem('cursos')===null){
         cursosLS=[];
     }else{
         cursosLS=JSON.parse(localStorage.getItem('cursos'));
     }
     return cursosLS;
 }

 //cargar los cursos almacenador en LS en el carrito
 function cargarCursosCarrito(){
     const cursosLS= obtenerCursosLS();
     cursosLS.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML= `
        <td>
            <img src="${curso.imagen}" width="100">
        </td>
        <td>
            ${curso.titulo}
        </td>
        <td>
            ${curso.precio}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
        `;
        listaCursos.appendChild(row);
     });
    
 }

//eliminar curso ls
function eliminarCursoLS(cursoId){
    let cursosLS=obtenerCursosLS();

    cursosLS.forEach((cursoLS,index) => {
        if(cursoLS.id === cursoId){
            cursosLS.splice(index,1);
        }
    });
    localStorage.setItem('cursos',JSON.stringify(cursosLS));
}

//vaciar carrito del LS
function vaciarCarritoLS(){
    localStorage.removeItem('cursos');
}