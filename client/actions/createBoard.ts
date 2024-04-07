import updateUser from "./updateUser"
import fetchUser from "./fetchUser"

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

    const user = await fetchUser(userId);

    const ownedBoards = [...user.ownedBoards, result.id];

    const newUserData = {
      ClerkId: user.clerkId,
      Name: user.name,
      Email: user.email,
      OwnedBoards: ownedBoards,
      SharedBoards: user.sharedBoards,
    }

    await updateUser(newUserData, userId)
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}
