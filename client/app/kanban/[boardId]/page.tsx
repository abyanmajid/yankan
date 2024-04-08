import React from 'react'
import KanbanColumn from "@/components/kanban/kanban-column"
import { Button } from "@/components/ui/button"
import { GlobeIcon } from '@radix-ui/react-icons'
import DeleteBoardBtn from '@/components/kanban/delete-board'
import CreateTaskBtn from '@/components/kanban/create-task'
import { currentUser } from '@clerk/nextjs'
import fetchBoard from '@/actions/fetchBoard'
import fetchTask from '@/actions/fetchTask'
import { notFound } from 'next/navigation'
import { clerkClient } from '@clerk/nextjs'

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
  console.log(board)

  const todo_tasks = []
  const doing_tasks = []
  const done_tasks = []
  for (const taskId of board.tasks) {
    const task = await fetchTask(taskId)
    const issuer = await clerkClient.users.getUser(task.creator)
    task.creator = issuer.firstName + " " + issuer.lastName;
    if (task.type === "todo") {
      todo_tasks.push(task)
    } else if (task.type === "doing") {
      doing_tasks.push(task)
    } else if (task.type === "done") {
      done_tasks.push(task)
    } else {
      console.log("Task type doesn't match any of todo, doing, or done.")
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-y-scroll">
      <div className="m-8">
        <div className="mb-8 grid grid-cols-2">
          <h1 className="font-extrabold text-3xl flex items-center"><GlobeIcon width={28} height={28} />&nbsp;{board.name}</h1>
          <div className="grid justify-end">
            <div className="flex gap-2">
              <CreateTaskBtn userId={user!.id} boardId={params.boardId} />
              {user!.id === board.owner ? <DeleteBoardBtn boardId={params.boardId} /> : ""}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <KanbanColumn boardId={board.id} title="To Do" contents={todo_tasks} info="Tasks that has yet to be undertaken." />
          <KanbanColumn boardId={board.id} title="Doing" contents={doing_tasks} info="Tasks that are currently being carried out." />
          <KanbanColumn boardId={board.id} title="Done" contents={done_tasks} info="Tasks that has been completed." />
        </div>
      </div>
    </div>
  )
}

export default KanbanBoardPage
