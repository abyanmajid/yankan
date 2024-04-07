export default async function fetchUser(userId: string) {
  const url = `https://yankan20240405134553.azurewebsites.net/users/${userId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      let errorData;
      try {
        // Attempt to parse the error response as JSON
        errorData = await response.json();
      } catch (error) {
        // If parsing fails, it means there was no JSON response body.
        errorData = { message: 'No response body' };
      }
      throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`);
    }

    const userData = await response.json();
    console.log('User data:', userData);
    return userData;
  } catch (error: any) {
    console.error('Fetching user failed:', error.message);
    throw error;
  }
}
