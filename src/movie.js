import './style.css'
import {getMovieById} from './api.js'

const container = document.getElementById('movie-container')
const title = document.getElementById('movie-title')
const poster = document.getElementById('movie-poster')
const plot = document.getElementById('movie-full-plot')
const genre = document.getElementById('movie-genre')
const actors = document.getElementById('movie-actors')

// récupérer l'ID dans l'URL du film sélectionné depuis search.hmtl //

    // fonction URLSearchParams permet de sélectionner un item dans l'URL //
    // window.location indique la page actuelle d'affichage : //
    // ici localhost (l'ID doit se trouver dedans après sélection) //
    // .search renvoie partie de l'URL qui se trouve après le ? //
const urlParameters = new URLSearchParams(window.location.search)

    // pour être sûre d'avoir ID et non autre item qui se trouve après le ? //
const imdbID = urlParameters.get('id')

// appel fonction importée //
if (imdbID) {
    getMovieById(imdbID)
    .then(dataMovie => {

        // si recherche vide (=!) car dataMovie renvoie rien, stoppe fonction ici, pas envoi à OMDb //
        if (!dataMovie) {
            throw new Error("Aucune donnée reçue.")
        }
    
        // si imdbID de l'URL correspond à imdbID d'un film trouvé dans OMDb alors True => renvoi data //
        if (dataMovie.Response === "True") {
            // innerText fonctionne comme innerHTML mais à l'intérieur d'une balise déjà dans le HTML //
            title.innerText = dataMovie.Title
            poster.src = dataMovie.Poster
            plot.innerText = dataMovie.Plot
            genre.innerText = dataMovie.Genre
            actors.innerText = dataMovie.Actors
        }
        
        // si fonction ok mais API refuse requête (Response: "False"): message d'erreur contenu dans  //
        else {
            container.innerHTML = `<p>Film non trouvé ou identifiant de film invalide.</p>`
        }
    })

    // si fonction pas ok (erreur technique), affichage message d'erreur dans HTML via const container //
    // message d'erreur dans le throw new Error du getMovieById d'api.js //
    // .message = propriété qui contient le texte d'Error//
    .catch(error => {
        container.innerHTML = `<p>${error.message}</p>`
    })
}