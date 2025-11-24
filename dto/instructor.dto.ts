import {z} from 'zod'

export const instructorSchema=z.object({
    body:z.object({
        name:z.string(),
        email:z.email(),
        specialization:z.string(),
        country:z.string(),
        experienceYear:z.string()
    })
})

export type insructorDTO=z.infer< typeof instructorSchema >['body']