import React from 'react'
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

const DeleteBoardBtn = () => {
  return (
    <div>
      <Dialog>
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
            <Button variant="destructive">Confirm Deletion</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DeleteBoardBtn 
