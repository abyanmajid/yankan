"use client"
import React, { useState } from 'react'
import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast"
import fetchBoard from "@/actions/fetchBoard"
import fetchUser from "@/actions/fetchUser"
import { redirect, useRouter } from "next/navigation"

type propsType = {
  boardId: string
}

const DeleteBoardBtn = (props: propsType) => {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  async function deleteBoard() {
    const supabase = createClient();
    const board = await fetchBoard(props.boardId)

    // Delete tasks
    for (const taskId of board.tasks) {
      await supabase
        .from("tasks")
        .delete()
        .eq("id", taskId)
    }

    // Delete boards from members table
    for (const memberId of board.members) {
      const member = await fetchUser(memberId);
      for (const sharedBoard of member.sharedBoards) {
        if (sharedBoard === props.boardId) {
          await supabase
            .from('users')
            .update({
              shared_boards: member.sharedBoards.filter((boardId: any) => boardId !== props.boardId)
            })
            .eq('clerk_id', memberId)
        }
      }
      for (const ownedBoard of member.ownedBoards) {
        if (ownedBoard === props.boardId) {
          await supabase
            .from('users')
            .update({
              owned_boards: member.ownedBoards.filter((boardId: any) => boardId !== props.boardId)
            })
            .eq('clerk_id', memberId)
        }
      }
    }

    // Delete board
    await supabase
      .from('boards')
      .delete()
      .eq('id', props.boardId)

    router.push("/kanban")
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline"><TrashIcon className="text-red-500 absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />        </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone and will permanently delete this board.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Button onClick={() => deleteBoard()} variant="destructive">Confirm Deletion</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DeleteBoardBtn 
