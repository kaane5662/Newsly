import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SignUp(){
    const navigate = useNavigate()
    const [message, setMessage] = useState("")

    const createAccount = (e:any) =>{
        e.preventDefault()
        setMessage("");
        const username = e.target.username.value
        const password = e.target.password.value
        const confirmpassword = e.target.confirmpassword.value
        const email = e.target.email.value
        const data = {email, username, password, confirmpassword}
        axios.post("http://localhost:8000/api/accounts/", data).then((response)=>{
            // setMessage(response.data?.message)
            console.log(response.data)
            navigate("/login")
        }).catch((error)=>{
            setMessage(error?.response?.data?.message)
            console.log(error)
        })
    }

    return(
        <div className="flex">
            <div className="w-[40%] max-w[50%]">
                <h3 className="text-lg text-center font-semibold bg-red-800 text-white">{message}</h3>
                <form className=" rounded-md p-12 px-24 flex-col flex gap-3 font-rcondensed   " onSubmit={(e)=> createAccount(e)}>
                    <h1 className="font-bold text-4xl text-center font-poppins  ">Create an account</h1>
                    <h3 className=" text-md  text-center font-poppins text-gray-400      ">Start reading and writing blogs</h3>
                    <label htmlFor="username" className="-mx-4 text-md font-semibold text-zinc-500">Username</label>
                    <input name = "username" type="text" className="p-4 w-[100%] h-[50px] border-zinc-500 border-2 rounded-md" placeholder="Username..." required = {true}></input>
                    <label htmlFor="email" className="-mx-4 text-md font-semibold text-zinc-500">Email</label>
                    <input name = "email" type="text" className="p-4 w-[100%] h-[50px] border-zinc-500 border-2 rounded-md" placeholder="Email..." required = {true}></input>
                    <label htmlFor="password" className="-mx-4 text-md font-semibold text-zinc-500 ">Password</label>
                    <input name = "password" type="password" className="p-4 w-[100%] h-[50px] border-zinc-500 border-2 rounded-md " placeholder="Password..." required = {true}></input>
                    <label htmlFor="confirmpassword" className="-mx-4 text-md font-semibold text-zinc-500 ">Confirm Password</label>
                    <input name = "confirmpassword" type="password" className="p-4 w-[100%] h-[50px] border-zinc-500 border-2 rounded-md " placeholder="Confirm Password..." required = {true}></input>
                    <div className=" flex justify-center items-center mt-4  ">
                        <button type="submit" className="font-poppins w-[250px] h-[75px] text-white rounded-full text-xl border-2 bg-black font-bold duration-500 hover:scale-105">Sign up</button>
                    </div>
                </form>

            </div>
            <div className="w-[60%] h-[100vh] bg-black">
                

            </div>
            
        </div>
    )
}