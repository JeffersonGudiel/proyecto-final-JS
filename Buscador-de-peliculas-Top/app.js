let pagina = 1;
const bntAnterior = document.getElementById('btnAnterior');
const bntSiguiente = document.getElementById('btnSiguiente');

bntSiguiente.addEventListener('click', () => {
    if(pagina < 1000){
    pagina += 1;
    cargarPeliculas();
   }
});

bntAnterior.addEventListener('click', () => {
    if(pagina > 1){
    pagina -= 1;
    cargarPeliculas();
   }
});

const cargarPeliculas = async() => {

    try {const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0a2a189bc59811f4c0047dceef3bb9b1&language=es-MX&page=${pagina}`);

    console.log(respuesta);

    if(respuesta.status === 200){
        const datos = await respuesta.json();
   
            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">


                
                </div>
                <h3 class="titulo">${pelicula.title}</h3>
                `;
            });

            document.getElementById('contenedor').innerHTML = peliculas;

    }else if(respuesta.status === 401){
        console.log('Pusiste la llave mal');

    }else if(respuesta.status === 404){
        console.log('la pelicula que buscas no existe');
    }else{
        console.log('Hubo un error y no se conoce el origen');
    }

} catch(error){

    console.log(error);

}
}

cargarPeliculas();