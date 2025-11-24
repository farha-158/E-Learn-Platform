import {z} from 'zod'

export const forgetPasswordSchema=z.object({
    body:z.object({
        email:z.email()
    })
})

export type forgetPasswordDTO=z.infer< typeof forgetPasswordSchema>['body']