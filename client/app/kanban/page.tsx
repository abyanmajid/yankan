import React from 'react'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { currentUser } from '@clerk/nextjs'
import fetchUser from '@/actions/fetchUser'
import fetchBoard from '@/actions/fetchBoard'
import CreateBoardBtn from '@/components/kanban/create-board'
import { clerkClient } from '@clerk/nextjs';

const KanbanPage = async () => {
  const user = await currentUser();
  const userId = user!.id;
  const supabaseUser = await fetchUser(userId);

  const boards = [...supabaseUser.ownedBoards, ...supabaseUser.sharedBoards]
  boards.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const boardsData = []
  for (const boardId of boards) {
    const boardData = await fetchBoard(boardId)
    const boardOwner = await clerkClient.users.getUser(userId);
    boardData.owner = boardOwner.firstName + " " + boardOwner.lastName
    const membersImgUrl = []
    for (const memberId of boardData.members) {
      const member = await clerkClient.users.getUser(memberId)
      membersImgUrl.push(member.imageUrl)
    }
    boardData.membersImgUrl = membersImgUrl
    boardsData.push(boardData);
  }

  console.log(boardsData)

  return (
    <div className="flex flex-col h-screen overflow-y-scroll">
      <div className="m-8">
        <div className="mb-8 grid grid-cols-2">
          <h1 className="font-extrabold text-3xl flex items-center">Kanban Boards</h1>
          <div className="grid justify-end">
            <CreateBoardBtn userId={userId} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {boardsData.map((board) => {
            return (
              <Link href={`/kanban/${board.id}`} key={board.id}>
                <Card className="hover:bg-zinc-900">
                  <CardHeader>
                    <CardDescription>{board.owner}</CardDescription>
                    <CardTitle className="text-xl">{board.name}</CardTitle>
                  </CardHeader>
                  <CardFooter>
                    {board.members.length === 1 ? "1 member" : board.members.length + " members"}
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default KanbanPage
