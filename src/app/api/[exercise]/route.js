import axios from "axios";

export async function GET(req, { params }) {
  const { exercise } = await params;

  const options = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${exercise}`,
    headers: {
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    },
  };

  try {
    const response = await axios.request(options);
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch exercises" }),
      { status: 500 }
    );
  }
}
