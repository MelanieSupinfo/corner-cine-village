//Un seul fichier api.js évite de dupliquer l'API key et les fonctions de fetch sur chaque fichier js:
// export des fonctions de ce fichier api.js dans les autres fichiers .js //

//Protection API key (si dépôt devient public): lien vers stockage local de la clef//
//import.meta.env = objet de Vite, contient variables d'environnement, injecte tout ce qui commence par VITE_ dans .env.local //
const API_KEY = import.meta.env.VITE_OMDB_API_KEY 

//évite de réécrire l'adresse du site OMDb à chaque requête. Si URL change, modification de cette constante uniquement//
const LINK_URL = 'https://www.omdbapi.com/' 

export async function queryMovies(query) {
    
    // format URL cahier des charges// 
    // fonction encodeURIComponent transforme caractères spéciaux en code pour URL (espaces remplacés par %) sinon requête marche pas//
    const url = LINK_URL + '?apikey=' + API_KEY + '&s=' + encodeURIComponent(query)
    
    const response = await fetch(url)

    //conversion en objet JSON des data Title, Year, etc.//
    const data_movies = await response.json()

    if (data_movies.Response === 'False') { 
        //format de réponse OMDb : Response :'True' et Error : Movie not found!//
        throw new Error("Aucun résultat. Veuillez réssayer.")
    }

    return {
        // results : définit ici pour être réutilisé dans les autres fichiers js
        // Search = tableau de résultats d'OMDb
        // opérateur OU || : si Search renvoie un résultat, il est affiché ; sinon renvoie tableau vide (Sans OU, bug = undefined)//
        results: data_movies.Search || [], 
    
        total: data_movies.totalResults || 0 //idem explication que pour results//
    }
}