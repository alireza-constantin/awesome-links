import { z } from 'zod'

export const LinkSchema = z.object({
    title: z.string({
        required_error: "title is required",
        invalid_type_error: "title must be a string",
    }).min(2, { message: 'title must be more than 2 character' }),
    description: z.string({
        required_error: "description is required",
        invalid_type_error: "description must be a string",
    }).min(5, { message: 'description must be more than 5 character' }),
    url: z.string({
        required_error: "url is required",
    }).url({ message: 'Please enter a valid url' }),
    imageUrl: z.string({
        required_error: "image url is required",
    }).url({ message: 'Please enter a valid image url' }),
    category: z.string({
        required_error: 'category is required',
        invalid_type_error: 'category must be string'
    }).min(1, { message: 'Category can not be empty' })
}).required()
