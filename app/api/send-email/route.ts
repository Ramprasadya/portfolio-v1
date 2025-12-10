import { NextResponse } from "next/server";
const nodemailer = require('nodemailer')
require('dotenv').config()

export async function POST(request:Request) {
    const body= await request.json();
// console.log(process.env) 
    const message = {
        from:`Portfolio Contact ${body.email}`,
        to: process.env.EMAIL_TO,
        subject: "",
        html:`
        <p>
        Hello ${body.name}
        </p>
       <p>Email : ${body.email}</p>
        <p>
         Message : ${body.message}
        </p>
        `,
        headers:{
            "X-Entity-Ref-ID" : "newmail"
        },
    };

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user : process.env.EMAIL_TO,
            pass: process.env.PASS
        },
        tls:{
            rejectUnauthorized :false
        }
    })

    // console.log(JSON.stringify(body))

    try{
        await transporter.sendMail(message);
        return NextResponse.json({message:"Email send Successfully"}, {status:200})
        
}catch(err:any){
    return NextResponse.json({error : err.message}, {status:500})
}
}