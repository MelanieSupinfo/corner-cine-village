// Fonction-outil pour créer des fiches de films en innerHTML => pour search.js et main.js //
// création fiche Film pour insertion div HTML quand il y a un résultat //
// parmi les infos récupérées de la requête, création lien qui charge l'ID du film 
// plutôt que le titre dans http://localhost 
// pour que movie.js puisse utiliser fonction getMovieById dans api.js //
export function createMovieCard(movie) {
  return `
    <div class="movie-card">
      <img src="${movie.Poster}" alt="${movie.Title}" />
      <h3>${movie.Title}</h3>
      <a href="/movie.html?id=${movie.imdbID}">En savoir plus</a>
    </div>
  `
}