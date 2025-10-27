

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

export const fetchMovies = async ({ query }: { query : string })  => {
  // Build URL (include API key as query param if present)
  const endPoint = query
     ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
     : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`
  

  const response = await fetch(endPoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies:  ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};


export const getMovieDetails = async( id : string | number) :Promise<MovieDetails> => {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${id}api_key=${TMDB_CONFIG.API_KEY}`;
   
    const response = await fetch(endpoint,{
      method : 'GET',
      headers: TMDB_CONFIG.headers,
    })
  
    if(!response.ok){
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
    
  };
