export default async function updateUser(data: any, userId: string) {
  console.log(userId)
  const WEB_API_URL = "https://yankan20240405134553.azurewebsites.net";

  try {
    const response = await fetch(`${WEB_API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    console.log('Success:', result);
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}
