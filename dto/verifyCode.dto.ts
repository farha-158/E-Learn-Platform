import {z} from 'zod'

export const verifyCodeSchema=z.object({
    body:z.object({
        email:z.email(),
        code:z.string().max(6).min(6)
    })
})

export type verifyCodeDTO=z.infer< typeof verifyCodeSchema>['body']