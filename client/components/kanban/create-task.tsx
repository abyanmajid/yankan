"use client"
import React, { useState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import createTask from '@/actions/createTask'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  task: z.string().min(1, {
    message: "Task statement must not be empty.",
  }),
  type: z.enum(["todo", "doing", "done"], {
    required_error: "You must select a task type.",
  }),
  due: z.date({
    required_error: "You must identify a due date.",
  }),
})

type propsType = {
  userId: string,
  boardId: string,
}

const CreateTaskBtn = (props: propsType) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
    },
  })

  const [open, setOpen] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const dueDate = new Date(values.due)
    const isoDueDate = dueDate.toISOString();
    const data = {
      creator: props.userId,
      type: values.type,
      task_statement: values.task,
      assignees: [],
      due: isoDueDate,
    }
    console.log(data)
    await createTask(data, props.boardId)
    toast({
      description: `Successfully created a new task!`,
    })
    setOpen(false);
    router.refresh()
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create New Task</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Task Statement */}
              <FormField
                control={form.control}
                name="task"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task</FormLabel>
                    <FormControl>
                      <Input placeholder="Write your task statement here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Task Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value} className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="todo" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            To Do
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="doing" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Doing
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="done" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Done
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Due Date */}
              <FormField
                control={form.control}
                name="due"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a due date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date.getTime() < new Date().setHours(0, 0, 0, 0)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default CreateTaskBtn 
