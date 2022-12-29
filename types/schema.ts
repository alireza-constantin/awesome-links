import z from 'zod'

export const helloNameSchema = z.string().min(2, { message: 'name can not be less than 2 charcater' })
