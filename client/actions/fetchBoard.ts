export default async function fetchBoard(boardId: string) {
  const url = `https://yankan20240405134553.azurewebsites.net/boards/${boardId}`;

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

    const boardData = await response.json();
    return boardData;
  } catch (error: any) {
    console.error('Fetching board failed:', error.message);
    throw error;
  }
}
