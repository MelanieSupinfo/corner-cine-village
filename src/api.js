//Un seul fichier api.js évite de dupliquer l'API key et les fonctions de fetch sur chaque fichier js:
// export des fonctions de ce fichier api.js dans les autres fichiers .js //

//Protection API key (si dépôt devient public): lien vers stockage local de la clef//
const API_KEY = import.meta.env.VITE_OMDB_API_KEY 
//import.meta.env = objet de Vite, contient variables d'environnement, injecte tout ce qui commence par VITE_ dans .env.local //
const LINK_URL = 'https://www.omdbapi.com/' 
//évite de réécrire l'adresse du site OMDb à chaque requête. Si URL change, modification de cette constante uniquement//

export async function queryMovies(query) {
const url = LINK_URL + '?apikey=' + API_KEY + '&s=' + encodeURIComponent(query)
// format URL cahier des charges// 
// fonction encodeURIComponent transforme caractères spéciaux en code pour URL (espaces remplacés par %) sinon requête ne marche pas//

const response = await fetch(url)
const data_movies = await response.json() //conversion en objet JSON des data Title, Year, etc.//

if (data_movies.Response === 'False') { //format de réponse OMDb : "Response":"True" et "Error": "Movie not found!"//
throw new Error("Aucun résultat. Veuillez réessayer.")
}
return {
data_movies : [],
}
}