import './style.css'
import {queryMovies} from './api.js'

const form = document.getElementById('search-form')
const input = document.getElementById('search-input')
const searchResults = document.getElementById('search-results')
const loadMoreBtn = document.getElementById('load-more-btn')

// déclaration pour charger les données à distribuer aux fonctions //
let allData = []

function displayMovies(movies) {
   
    // boucle for sur chaque film trouvé : 
    // compteur de film i pour indice, commence tjs à 0, i++ incrémente de i+1 //
    // length = nbr d'éléments de results //
  for (let i = 0; i < movies.length; i++) {
    
    // constante pour réutiliser chaque résultat de film trouvé par la boucle dans une fiche //
    const movie = movies[i]

    // création fiche Film pour insertion div HTML quand il y a un résultat //
    const movieCard = `
      <div class="movie-card">
        <img src="${movie.Poster}" alt="${movie.Title}" />
        <h3>${movie.Title}</h3>
        <a href="/movie.html?title=${encodeURIComponent(movie.Title)}">En savoir plus</a>
      </div>
    `
    // insertion de la fiche Film dans la page HTML via const searchResults//
    searchResults.innerHTML += movieCard
  }
}

form.addEventListener('submit', async (e) => { // e comme event par convention //
    
    // empêche rechargement page //
    e.preventDefault()
    // pour vérifier que cette fonction fonctionne ^^ //
    console.log("Page, ne te recharge PAS maintenant !")
    
    // valeur rentrée dans la barre de recherche + trim enlève les espaces //
    const query = input.value.trim()
    
    // si recherche vide, stoppe la fonction, pas d'envoi à OMDb //
    if (!query) {
        return
    }

    try {
        const data_search = await queryMovies(query)

        // rattachement des données de la constante à la boîte allData déclarée en let //
        allData = data_search 

        // fonction affichage des films appelée pour les 3 1ers films : //
        // results est le tableau de films renvoyé par OMDb dans le return d'api.js //
        displayMovies(data_search.results.slice(0, 3))

        // si moins de 3 résultats, bouton Charger plus caché sinon btn s'affiche à la suite //
        if (data_search.results.length <= 3) {
        loadMoreBtn.style.display = 'none'
        }
        else {
        loadMoreBtn.style.display = 'inline-block'
        }
    } 
    catch (error) {
        // si recherche pas ok, affichage message d'erreur dans HTML via const searchResults //
        // message d'erreur dans le throw new Error d'api.js //
        // .message = propriété qui contient le texte d'Error//
        searchResults.innerHTML = `<p>${error.message}</p>`
        loadMoreBtn.style.display = 'none'
    }
})

// fonction d'écoute du clic ici car pas de formulaire à submit //
loadMoreBtn.addEventListener('click', () => {
  
    // rajouter 3 films de plus à l'indice de la boucle for //
  const start = 3
  const end = start + 3
  // appel boîte allData contenant data_search //
  const moreMovies = allData.results.slice(start, end)

  // affichage des films chargés en plus : appel de la fonction d'affichage //
  displayMovies(moreMovies)

  // si fin de la liste de résultats, bouton caché //
  if (end >= window.allData.results.length) {
    loadMoreBtn.style.display = 'none'
  }
})

