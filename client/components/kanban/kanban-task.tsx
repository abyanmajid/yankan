"use client"
import React, { useState } from 'react'
import { z } from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import AssignForm from './assign-form'
import { formatTimestamp } from '@/lib/utils'
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import fetchBoard from "@/actions/fetchBoard"

const assignFormSchema = z.object({
  email: z.string().min(1, {
    message: "You must enter a member's email.",
  }),
})

type propsType = {
  boardId: string,
  id: string,
  creator: string,
  type: string,
  task_statement: string,
  assignees: string[],
  due: string
}

const KanbanTask = (props: propsType) => {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  function assignOnSubmit(values: z.infer<typeof assignFormSchema>) {
    console.log(values)
  }

  async function updateTaskStatus(toType: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from('tasks')
      .update({ type: toType })
      .eq('id', props.id)
    toast({
      description: "Successfully updated task status!",
    })
    setOpen(false);
    router.refresh()
  }

  async function deleteTask() {
    const supabase = createClient();
    const board = await fetchBoard(props.boardId);
    console.log(board)

    const response = await supabase
      .from('boards')
      .update({
        tasks: board.tasks.filter((taskId: any) => taskId !== props.id)
      })
      .eq('id', props.boardId);

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', props.id)
    toast({
      description: "Successfully deleted task!",
    })
    setOpen(false);
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-left">
        <Card className="m-4 hover:bg-zinc-900">
          <CardContent className="pt-6">
            <CardDescription>Due: {formatTimestamp(props.due)}</CardDescription>
            <p>{props.task_statement}</p>
          </CardContent>
          <CardFooter className="grid">
            <CardDescription className="mb-2">Issued by: {props.creator}</CardDescription>
            {props.assignees.length != 0 ?
              <div className="text-sm">
                Assignees: {props.assignees.map((assignee, key) => (
                  <Badge key={key} variant="secondary">{assignee}</Badge>
                ))}
              </div> : ""}
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            Due: {formatTimestamp(props.due)}
          </DialogDescription>
          <DialogTitle className="py-2">{props.task_statement}</DialogTitle>
          <DialogDescription>
            Issued by: {props.creator}
          </DialogDescription>
          <div className="pt-4">
            {props.assignees.length != 0 ?
              <div className="text-sm">
                Assignees: {props.assignees.map((assignee, key) => (
                  <Badge key={key} variant="secondary">{assignee}</Badge>
                ))}
              </div> : ""}
            <div className="py-4">
              <Separator />
            </div>
          </div>
          <span className="font-medium text-sm">Update Status</span>
          <div className="grid grid-cols-3 gap-2">
            <Button onClick={() => updateTaskStatus("todo")} variant={props.type === "todo" ? "secondary" : "outline"}>To Do</Button>
            <Button onClick={() => updateTaskStatus("doing")} variant={props.type === "doing" ? "secondary" : "outline"}>Doing</Button>
            <Button onClick={() => updateTaskStatus("done")} variant={props.type === "done" ? "secondary" : "outline"}>Done</Button>
          </div>
          {/* <div className="py-4"> */}
          {/*   <Separator /> */}
          {/* </div> */}
          {/* <AssignForm onSubmit={assignOnSubmit} formSchema={assignFormSchema} /> */}
          <div className="py-4">
            <Separator />
          </div>
          <div className="flex">
            <Button onClick={() => deleteTask()} variant="destructive">Delete Task</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default KanbanTask
