import {z} from 'zod'

export const courseSchema=z.object({
    body:z.object({
        name:z.string(),
        instructor:z.string(),
        releaseDate:z.iso.date(),
        price:z.string(),
        description:z.string(),
        videoCount:z.string(),
        courseDuration:z.string(),
        language:z.string(),
        level:z.string()
    })
})

export type courseDTO=z.infer<typeof courseSchema>['body']