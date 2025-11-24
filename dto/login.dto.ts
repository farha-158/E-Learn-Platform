import { z} from "zod"; 

export const loginClientSchema=z.object({
    body:z.object({
        email:z.email(),
        password:z.string()
    })
})

export type loginClientDTO=z.infer< typeof loginClientSchema>['body']
