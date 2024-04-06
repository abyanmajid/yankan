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

const KanbanPage = async () => {
  return (
    <div className="flex flex-col h-screen overflow-y-scroll">
      <div className="m-8">
        <div className="mb-8 grid grid-cols-2">
          <h1 className="font-extrabold text-3xl flex items-center">Kanban Boards</h1>
          <div className="grid justify-end">
            <Button>Create Board</Button>
          </div>
        </div>
        <div className="grid grid-cols-4">

          <Link href="/kanban/1">
            <Card className="hover:bg-zinc-900">
              <CardHeader>
                <CardDescription>Username</CardDescription>
                <CardTitle className="text-xl">Board Name</CardTitle>
              </CardHeader>
              <CardFooter>
                <div className="flex -space-x-4 rtl:space-x-reverse">
                  <Image className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/pfp-example.jpg" alt="" width={16} height={16} />
                  <Image className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/pfp-example.jpg" alt="" width={16} height={16} />
                  <Image className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/pfp-example.jpg" alt="" width={16} height={16} />
                  <Image className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/pfp-example.jpg" alt="" width={16} height={16} />
                </div>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default KanbanPage