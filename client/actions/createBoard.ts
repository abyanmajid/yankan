import updateUser from "./updateUser"

export default async function createBoard(data: any, userId: string) {
  const WEB_API_URL = "https://yankan20240405134553.azurewebsites.net";

  try {
    const response = await fetch(`${WEB_API_URL}/boards`, {
      method: 'POST',
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

    // const newUserData = {
    //   OwnedBoards: [],
    // }
    //
    // updateUser(newUserData, userId)
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}
