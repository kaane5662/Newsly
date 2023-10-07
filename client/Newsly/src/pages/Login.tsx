import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login(){
    const navigate = useNavigate()
    const [message, setMessage] = useState("");

    const login = (e: any) => {
        e.preventDefault()
        setMessage("")
        console.log("Pressed submit button")
        const data = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        axios.put("http://localhost:8000/api/accounts/", data, {
            withCredentials: false,
        }).then((response)=>{
            console.log(response.data)
            document.cookie = `authtoken = ${response.data.token}`
            navigate("/")
            window.location.reload()
        }).catch((error)=>{
            setMessage(error.response.data.message)
            console.log(error)
        })

    }

    return (
        <div className="px-[500px] py-12  ">
            
            <form onSubmit={(e)=> login(e)} className=" shadow-xl rounded-md p-12 flex-col flex gap-6 font-rcondensed bg-white bg-blur   ">
                <h1 className="font-bold text-4xl text-center font-poppins  ">Login</h1>
                <h3 className="text-lg text-center font-semibold text-red-800">{message}</h3>

                <label htmlFor="username" className="-mx-4 text-md font-semibold text-zinc-500">Username</label>
                <input name = "username" type="text" className="p-4 w-[100%] h-[50px] border-zinc-500 border-2 rounded-md" placeholder="Username..." required = {true}></input>
                <label htmlFor="password" className="-mx-4 text-md font-semibold text-zinc-500 ">Password</label>
                <input name = "password" type="password" className="p-4 w-[100%] h-[50px] border-zinc-500 border-2 rounded-md " placeholder="Password..." required = {true}></input>
                <div className=" flex justify-center items-center mt-12">
                    <button type="submit" className=" hover:bg-black hover:text-white duration-500 hover:scale-105 font-sans w-[250px] h-[75px] rounded-md text-xl border-2 border-black font-bold">Login</button>
                </div>
            </form>
        </div>
    )
   
}