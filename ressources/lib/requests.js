import { BASE_URL, API_KEY } from "@env"

const apiKey = process.env.API_KEY
const baseUrl = process.env.BASE_URL

const requests = {
    fetchTopRated: `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=en-US`,
    fetchTopMovies: `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=en-US`,
    fetchTopSeries: `${baseUrl}/tv/top_rated?api_key=${apiKey}&language=en-US`,
    fetchPopularMovies: `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US`,
    fetchPopularSeries: `${baseUrl}/tv/popular?api_key=${apiKey}&language=en-US`,
}

export default requests