import clientPromise from "@/lib/mongoServer/index"
let client;
let db;
let movies;

async function init() {
  if (db) return
  try {
    client = await clientPromise;
    db = await client.db();
    movies = await db.collection('movies');
  } catch (err) {
    throw new Error("Failed to stablish a connection to database");
  }
}

;(async () => {
  await init(); // call the init function
})();

/////Movies Filter

export async function getMovies() {
  try {
    if (!movies) await init(); // wait if movies handle already exist
    const result = await movies
      .find({})
      .limit(20)
      .map(user => ({ ...user, _id: user._id.toString() }))
      .toArray();
    return { movies: result };
  } catch (err) {
    return { err: "Failed to catch Movies" };
  }
}
