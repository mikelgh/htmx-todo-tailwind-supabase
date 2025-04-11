import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  completed: z.coerce.boolean(),
  due_date: z.coerce.date()
})

export type Task = z.infer<typeof TaskSchema>