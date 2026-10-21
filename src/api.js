//Un seul fichier api.js évite de dupliquer l'API key et les fonctions de fetch sur chaque fichier js:
// export des fonctions de ce fichier api.js dans les autres fichiers .js //

//Protection API key (si dépôt devient public): lien vers stockage local de la clef//
//import.meta.env = objet de Vite, contient variables d'environnement, injecte tout ce qui commence par VITE_ dans .env.local //
const API_KEY = import.meta.env.VITE_OMDB_API_KEY 

//évite de réécrire l'adresse du site OMDb à chaque requête. Si URL change, modification de cette constante uniquement//
const LINK_URL = 'https://www.omdbapi.com/' 

// fonction pour search.html => recherche via titre par les users, résultat = tableau de films //
// NB : Charge moins de résultats que recherche par ID => plus rapide //
export async function queryMovies(title = '', year = '') {
    
    // format URL cahier des charges (NB : recherche à s = titre multiple mieux que t car t = titre précis) //
    // fonction encodeURIComponent transforme caractères spéciaux en code pour URL (espaces remplacés par %) sinon requête marche pas//
    let url = LINK_URL + '?apikey=' + API_KEY + '&s=' + encodeURIComponent(title)
    
    const response = await fetch(url)

    //conversion en objet JSON des data Title, Year, etc.//
    const dataQuery = await response.json()

    //format de réponse OMDb : Response :'True' et Error : Movie not found!//
    if (dataQuery.Response === 'False') {
        throw new Error("Erreur lors du chargement. Veuillez recharger la page ou réessayer plus tard.")
    }

    return {
        // results : définit ici pour être réutilisé dans les autres fichiers js //
        // Search = tableau de résultats d'OMDb //
        // opérateur OU || : si Search renvoie un résultat, il est affiché ; sinon renvoie tableau vide (sans OU, bug = undefined) //
        results: dataQuery.Search || [],
        total: dataQuery.totalResults || 0 //idem explication que pour results//
    }
}

// fonction pour movie.html => recherche via ID par lien depuis search.html //
// résultat : renvoie toutes les champs du film dont le full plot //
export async function getMovieById(imdbID) {
    const url = LINK_URL + '?apikey=' + API_KEY + '&i=' + imdbID + '&plot=full'
    const response = await fetch(url)
    const dataByID = await response.json()

    if (dataByID.Response === 'False') {
        throw new Error("Erreur lors du chargement. Veuillez renouveler la recherche ou réessayer plus tard.")
    }

    return dataByID
}