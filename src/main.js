import './style.css'
import {getMovieById} from './api.js'
import {createMovieCard} from './tools.js'

const grid = document.getElementById('movies-grid')
const loadMoreBtn = document.getElementById('load-more-btn')

// quand user arrive sur index.html, variable initialisée à 1 (incrémentation +1 avec loadMoreBtn) //
let currentPage = 1
const moviesPerPage = 3

// liste films recommandés by IDs pour insertion en entrée dans la fonction getMovieById //
// ajouter plus d'IDs pour le bouton "Voir plus de films" (par ex films coup de coeur du cinema) //
const recommendedIDs = [
    'tt0111161', // The Shawshank Redemption (9.3)
    'tt1856101', // Blade Runner 2049 (8.1)
    'tt0105665', // Twin Peaks (prequel movie)
    'tt0068646', // The Godfather (9.2)
    'tt0475784', // Westworld (serie) (8.4)
    'tt31806037', // Adolescence (mini serie)
    'tt0468569', // The Dark Knight (9.0)
    'tt0119698', // Princess Mononoke
    'tt0167260', // The Lord of the Rings: The Return of the King (9.0)
    'tt8101850', // Undone (mini-serie)
    'tt0108052', // Schindler's List (9.0)
    'tt0065088', // They shoot horses, don't they ?
    'tt0120737', // The Lord of the Rings: The Fellowship of the Ring (8.9)
    'tt26743760', // The Apothecary diaries (serie, animated)
    'tt0110912', // Pulp Fiction (8.9)
    'tt10048342', // The Queen's gambit (mini-serie)
    'tt0167261', // The Lord of the Rings: The Two Towers (8.8)
    'tt0087182', // Dune (Lynch version)
    'tt36955518', // Jim Queen (animated)
    'tt0071562', // The Godfather Part II (9.0)
    'tt8946378', // Knives out
    'tt0137523', // Fight Club (8.8)
    'tt1748122', // Moonrise kingdom
    'tt0083658', // Blade Runner (1982) (8.1)
]

// fonction pour charger les films recommandés //
async function loadRecommendedMovies(page = 1) {
    
    // pour résoudre le comptage des positions à partir de 0 mais des pages à partir de 1 :
    // page 1 : (1 - 1) × 3 = 0 => affichage des films en positions 0, 1, 2 //
    const start = (page - 1) * moviesPerPage
    const end = start + moviesPerPage
    // slice prend tranche excluant son dernier nombre ici = slice(0,3) //
    const idsToLoad = recommendedIDs.slice(start, end)

    // création d'une constante locale à cette fonction pour récupèrer données //
    const allData = []
    
    // boucle for sur chaque ID trouvé : 
    // compteur d'ID, i pour indice, commence tjs à 0, i++ incrémente de i+1 //
    // length = nbr d'éléments de idsToLoad //
    for (let i = 0; i < idsToLoad.length; i++) {
        try {
            const movie = await getMovieById(idsToLoad[i])
            if (movie.Response === "True") {
                
                // pour ajouter chaque film dans le tableau allData //
                allData.push(movie)
            }
        } 
        catch (error) {
            // pas pour le user, uniquement en console (s'il manque un ID les autres s'affichent + bouton) //
            console.error("Erreur sur le film / ID", idsToLoad[i])
        }
    }

    // affichage des données //
    if (page === 1) {
        allData
        // '' efface recherche précédente mais uniquement à l'arrivée sur la page //
        // (sinon résultats effacés quand loadMoreBtn clicked) //
        grid.innerHTML = ''
    }
  
    // insertion fiches Film dans index.html avec fonction-outil importée //
    allData.forEach(movie => {
        grid.innerHTML += createMovieCard(movie)
    })

    // affichage bouton Voir plus de films //
    if (end >= recommendedIDs.length) {
        loadMoreBtn.style.display = 'none'
    } 
    // pas d'affichage du bouton si plus de résultats disponibles //
    else {
        loadMoreBtn.style.display = 'block'
    }
}

// lancement fonction avec chargement page 1 en paramètre //
loadRecommendedMovies(1)

// fonction d'écoute du clic du bouton "Voir plus de films" //
loadMoreBtn.addEventListener('click', () => {
    currentPage++
    loadRecommendedMovies(currentPage)
})