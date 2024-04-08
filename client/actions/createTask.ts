import { createClient } from "@/lib/supabase/client";
import fetchBoard from "./fetchBoard"

export default async function createTask(taskData: any, boardId: string) {
  const WEB_API_URL = "https://yankan20240405134553.azurewebsites.net";

  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert(taskData)
      .select()

    const board = await fetchBoard(boardId);
    console.log(board)

    const response = await supabase
      .from('boards')
      .update({ tasks: [...board.tasks, data![0].id] })
      .eq('id', boardId)

    console.log('Success')
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}
