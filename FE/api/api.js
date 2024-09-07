const API_BASE_URL = "http://127.0.0.1:3000";

export async function getPosts(path) {
  try {
    const response = await fetch(`${API_BASE_URL}/${path}`);
    return response;
  } catch (err) {
    console.log(`Fail to fetch ${path} board posts`);
  }
}
