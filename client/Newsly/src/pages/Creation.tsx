import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import CreationHeader from "../components/CreationHeader"
import axios from "axios"
import { getAuthToken } from "../components/getAuthToken"
import { useEffect, useState } from "react"

interface userCreation {
    id: number,
    title: string,
    image: string
}

export default function Creation(){

    
    const [UserCreations, setUserCreations] = useState([])
    const getUserCreations = () =>{
        axios.get("http://localhost:8000/api/create/", {
            headers: {
                Authorization: `Token ${getAuthToken()}`
            }
        }).then((response)=>{
            console.log(response.data)
            setUserCreations(response.data)
        }).catch(error =>{
            console.log(error)
        })
    }

    useEffect(()=>{
        getUserCreations()
    }, [])
    
    const createArticle = () =>{

        const token = "Token "+ getAuthToken()
        console.log(token)
        axios.post("http://localhost:8000/api/create/", {} ,{
            headers: {
                Authorization: token
            },
        }).then((response)=>{
            console.log(response.data)
            window.location.reload()
            // setUserCreations(response.data)
        }).catch(error =>{
            console.log(error)
        })
    }

    return (
        <main className="py-24 px-56">
            <div className="flex flex-wrap gap-8 justify-first  ">
                <div className="w-[230px] h-[230px] bg-black justify-center flex rounded-lg items-center bg-opacity-20 hover:scale-105  duration-500 cursor-pointer" onClick={()=> createArticle()}>
                    <FontAwesomeIcon className="h-[50px] font-bold text-white" icon={faPlus}></FontAwesomeIcon>
                </div>
                {
                UserCreations.map((creation:any, index)=>{
                    return (
                        <CreationHeader title = {creation.title} key = {index} id = {creation.id} image = {creation.image}></CreationHeader>
                    )
                })
                }
               
            </div>
        </main>
    )
}