export default async function createTask(data: any) {
  const WEB_API_URL = "https://yankan20240405134553.azurewebsites.net";

  try {
    const response = await fetch(`${WEB_API_URL}/tasks`, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    console.log('Success')
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}
