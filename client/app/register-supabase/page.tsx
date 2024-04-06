import { redirect } from 'next/navigation';
import React from 'react'
import { currentUser } from "@clerk/nextjs"
import fetchUser from '@/actions/fetchUser';

const RegisterSupabase = async () => {
  const user = await currentUser();
  try {
    await fetchUser(user!.id);
    redirect("/");
  } catch (error: any) {
    const data = {
      ClerkId: user!.id,
      Name: user!.firstName! + user!.lastName!,
      Email: user!.emailAddresses[0].emailAddress,
      OwnedBoards: [],
      SharedBoards: [],
    }

    const WEB_API_URL = process.env.WEB_API_URL;

    try {
      const response = await fetch(`${WEB_API_URL}/users`, {
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
    } catch (error: any) {
      console.error('Error:', error.message);
    }
    redirect("/")
  }
}

export default RegisterSupabase
