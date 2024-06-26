import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import KanbanTask from "./kanban-task"
import { clerkClient } from '@clerk/nextjs'

type propsType = {
  boardId: string,
  title: string,
  contents: any,
  info: string
}

const KanbanColumn = (props: propsType) => {
  return (
    <>
      <Card className="flex flex-col mb-32">
        <CardHeader>
          <CardTitle className="flex items-end">
            {props.title}&nbsp;
            <HoverCard>
              <HoverCardTrigger>
                <QuestionMarkCircledIcon width="22" height="22" className="hover:text-gray-300" />
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">
                  {props.info}
                </p>
              </HoverCardContent>
            </HoverCard>
          </CardTitle>
        </CardHeader>
        <Separator />
        {props.contents.map((task: any, key: any) => (
          <KanbanTask key={key} boardId={props.boardId} id={task.id} creator={task.creator} type={task.type} task_statement={task.taskStatement} assignees={task.assignees} due={task.due} />
        ))}
      </Card>
    </>
  )
}

export default KanbanColumn
