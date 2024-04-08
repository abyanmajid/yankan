export default async function fetchUser(taskId: string) {
  const url = `https://yankan20240405134553.azurewebsites.net/tasks/${taskId}`;

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

    const taskData = await response.json();
    return taskData;
  } catch (error: any) {
    console.error('Fetching task failed:', error.message);
    throw error;
  }
}
