import React from 'react'
import KanbanColumn from "@/components/kanban/kanban-column"
import { Button } from "@/components/ui/button"
import { GlobeIcon } from '@radix-ui/react-icons'
import DeleteBoardBtn from '@/components/kanban/delete-board'
import CreateTaskBtn from '@/components/kanban/create-task'
import { currentUser } from '@clerk/nextjs'
import fetchBoard from '@/actions/fetchBoard'
import { notFound } from 'next/navigation'

type paramsType = {
  boardId: string,
}

const KanbanBoardPage = async ({ params }: { params: paramsType }) => {
  const user = await currentUser()
  const board = await fetchBoard(params.boardId)
  if (board.members.includes(user!.id)) {
    console.log("ACCEPTED: User is a member of the board.")
  } else {
    console.log("DENIED: User is NOT a member of the board.")
    notFound()
  }

  return (
    <div className="flex flex-col h-screen overflow-y-scroll">
      <div className="m-8">
        <div className="mb-8 grid grid-cols-2">
          <h1 className="font-extrabold text-3xl flex items-center"><GlobeIcon width={28} height={28} />&nbsp;Untitled Board</h1>
          <div className="grid justify-end">
            <div className="flex gap-2">
              <CreateTaskBtn userId={user!.id} />
              <DeleteBoardBtn />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <KanbanColumn title="To Do" contents={[]} info="Tasks that has yet to be undertaken." />
          <KanbanColumn title="Doing" contents={[]} info="Tasks that are currently being carried out." />
          <KanbanColumn title="Done" contents={[]} info="Tasks that has been completed." />
        </div>
      </div>
    </div>
  )
}

export default KanbanBoardPage
