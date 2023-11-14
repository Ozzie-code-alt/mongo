import { getMovies } from "@/lib/mongoServer/movies";

async function fetchMovies() {
  const { movies } = await getMovies();
  if (!movies) throw new Error("Failed to fetch MOvies");

  return movies;
}

export default async function Home() {
  const movies = await fetchMovies();
  return (
    <>
    <div >

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>

    </div>
    </>
  );
}
