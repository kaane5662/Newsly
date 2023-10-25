
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAuthToken } from "./getAuthToken"

export default function Navbar(){
    
    const [isAuth, setIsAuth] = useState(false)
    const [username, setUsername] = useState("")
    const [searchParam, setSearchParam] = useState("")
    const navigate = useNavigate()
    
    
    const checkIsAuth = () =>{
        axios.get("http://localhost:8000/api/islogged/", {
            headers: {
                Authorization: `Token ${getAuthToken()}`
            }
        }).then((response)=>{
            console.log(response.data)
            setUsername(response.data.username)
            setIsAuth(true)
            
            
        }).catch(error =>{
            console.log(error)
        })
    }

    const logout = () => {
        axios.get("http://localhost:8000/api/accounts/", {
            headers: {
                Authorization: `Token ${getAuthToken()}`
            }
        }).then((response)=>{
            console.log(response.data)
            document.cookie = `authtoken =  `
            setIsAuth(false)
            navigate("/login")
        }).catch(error =>{
            console.log(error)
        })
    }

    useEffect(()=>{
        checkIsAuth()
        console.log("Hello all")
    }, [])
    return (
        <nav className="navbar sticky w-full">
            <div className="p-4 shadow-md flex w-full justify-between">
                {/* left */}
                <div className="flex gap-8 font-rcondensed items-center">
                    <h1 className="font-bold text-4xl">Newsly</h1>
                    <h3 className="text-xl hover:underline cursor-pointer duration-300" onClick = {()=> navigate("/")}>Home</h3>
                    <h3 className="text-xl hover:underline cursor-pointer duration-300" onClick={()=> navigate("/create")}>Create</h3>
                </div>
                {/* center */}
                <div className=" left-[40vw] items-center font-rcondensed flex">
                    <input onChange={(e)=> setSearchParam(e.target.value)} onKeyDown={(e)=> e.key == "Enter"? navigate(`/search?=${searchParam}`) :null } className="border-black border-2 w-[350px] border-opacity-50 h-[40px] p-4 rounded-md" placeholder="Search"></input>
                </div>
                {/* right */}
                <div className=" flex gap-8 font-rcondensed items-center">
                    {!isAuth ? (
                        <>
                        <h3 className="text-xl hover:underline cursor-pointer duration-300" onClick = {()=> navigate("/login")}>Login</h3>
                        <button onClick = {()=> navigate("/signup")} className="text-xl text-center bg-black text-white w-[100px] rounded-full h-[50px] hover:scale-110 duration-500 font-bold">Sign up</button>
                        </>
                    ):(
                        <>
                        <h3 className="text-xl duration-300" >{username}</h3>
                        <button onClick = {()=> logout()} className="text-xl text-center border-black border-2 text-black w-[100px] rounded-full h-[50px] hover:scale-110 duration-500 hover:bg-black hover:text-white hover:font-bold  ">Logout</button>   
                        </>
                    )}


                </div>
            </div>
        </nav>
    )
}   