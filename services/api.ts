// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjZlM2Y2ODhhZmU2NTVhNDFmMTcwOTM2ZWNiYzkyNiIsIm5iZiI6MTc2MDgwMjA1My41MDcsInN1YiI6IjY4ZjNiNTA1MjcyNDhmYWI5OTM5MTZiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aIQtRyPEjPLiY4hYiipKLLAsIX2ZM1J9F8D040RCYG0'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));


export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: (() => {
    const headers: Record<string, string> = {
      accept: 'application/json',
    };
    // If you have a TMDB v4 access token use Bearer. Otherwise pass api_key as query param.
    if (process.env.EXPO_PUBLIC_MOVIE_API_KEY) {
      headers.Authorization = `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`;
    }
    return headers;
  })(),
};

export const fetchPopularMovies = async ({ query }: { query?: string } = {}) => {
  // Build URL (include API key as query param if present)
  const apiKeyParam = TMDB_CONFIG.API_KEY ? `&api_key=${TMDB_CONFIG.API_KEY}` : '';
  const queryPart = query ? `&${query}` : '';
  const url = `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc${queryPart}${apiKeyParam}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};
