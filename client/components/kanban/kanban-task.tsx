"use client"
import React from 'react'
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

const assignFormSchema = z.object({
  email: z.string().min(1, {
    message: "You must enter a member's email.",
  }),
})

const KanbanTask = () => {
  function assignOnSubmit(values: z.infer<typeof assignFormSchema>) {
    console.log(values)
  }
  return (
    <Dialog>
      <DialogTrigger className="text-left">
        <Card className="m-4 hover:bg-zinc-900">
          <CardContent className="pt-6">
            <CardDescription>Due: April 19, 2024</CardDescription>
            <p>Card Content</p>
          </CardContent>
          <CardFooter className="grid">
            <CardDescription className="mb-2">Issued by: Abyan Majid</CardDescription>
            <div className="text-sm">
              Assignees: <Badge variant="secondary">Abyan Majid</Badge>
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            Due: April 19, 2024
          </DialogDescription>
          <DialogTitle className="py-2">Card Content</DialogTitle>
          <DialogDescription>
            Issued by: Abyan Majid
          </DialogDescription>
          <div className="pt-4">
            Assignees: <Badge variant="secondary">Abyan Majid</Badge>
            <div className="py-4">
              <Separator />
            </div>
          </div>
          <span className="font-medium text-sm">Update Status</span>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="secondary">To Do</Button>
            <Button variant="outline">Doing</Button>
            <Button variant="outline">Done</Button>
          </div>
          <div className="py-4">
            <Separator />
          </div>
          <AssignForm onSubmit={assignOnSubmit} formSchema={assignFormSchema} />
          <div className="py-4">
            <Separator />
          </div>
          <div className="flex">
            <Button variant="destructive">Delete Task</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default KanbanTask
