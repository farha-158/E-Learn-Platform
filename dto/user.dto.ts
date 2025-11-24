import { z} from "zod"; 

export const registerClientSchema=z.object({
    body:z.object({
        name:z.string()
        .superRefine((val, ctx) => {
            if (val.length < 6 || val.length > 12) {
                ctx.addIssue({
                    code:z.ZodIssueCode.custom,
                    message: "must between 6 -12",
                    
                });
            }
        }),
        age:z.number(),
        email:z.email(),
        password:z.string().superRefine((val, ctx) => {
            if (val.length < 6 || val.length > 12) {
                ctx.addIssue({
                    code:z.ZodIssueCode.custom,
                    message: "password must between 8 - 25",
                    
                });
            }
            if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*\(\)\-_=\+\[\]\{\};:'",.<>\/?\\|`~]).+$/.test(val)){
                ctx.addIssue({
                    code:z.ZodIssueCode.custom,
                    message: "Password must contain uppercase, lowercase, number, and special character",
                    
                });
            }
        }),
        confirmPassword:z.string()
    }).refine((data)=>data.password===data.confirmPassword,{
        message:'confirm Password not match password',
        path:['confirmPassword']
    })
})

export type registerClientDTO = z.infer<typeof registerClientSchema>["body"];


