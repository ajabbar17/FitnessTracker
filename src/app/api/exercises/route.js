import axios from "axios";

export async function GET(req, res) {
  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
    
    headers: {
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY, // Store your key in .env
    },
  };

  try {
    const response = await axios.request(options);
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch exercises" }), { status: 500 });
  }
}
