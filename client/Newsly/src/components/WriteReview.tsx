import axios from "axios"
import { useState, useEffect } from "react"
import { useParams} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"


export default function WriteReview({id}: any){

    function getAuthToken() {
        const cookies = document.cookie.split('; ');
        // Loop through the cookies to find the one containing the CSRF token
        for (const cookie of cookies) {
          const [name, value] = cookie.split('=');
          if (name === 'authtoken') {
            // Return the CSRF token value
            return decodeURIComponent(value);
          }
        }
        // Return null if the CSRF token cookie is not found
        return null;
    }

    const submitReview = (e: any) => {
        e.preventDefault()
        
        const data = {
            rating: e.target.rating.value,
            content: e.target.content.value
        }
        
        const token = getAuthToken()
        const auth = "Token "+token
        console.log(auth)
        axios.put(`http://localhost:8000/api/reviews/post/${id}/`, data,{
            headers: {
                Authorization: auth
            },
            
        }).then((response)=>{
            console.log(response.data)
            window.location.reload()
        }).catch((error)=>{
            console.log(error)
        })

    }


    return (
        <form className=" p-2 flex flex-col gap-2 rounded-md" onSubmit={(e)=> submitReview(e)}>
            <div className="flex gap-4">
                <div className="flex gap-2 place-items-start items-center">
                    <FontAwesomeIcon className=" h-12" icon={faStar}></FontAwesomeIcon>
                    <input className=" border-2 rounded-md w-[100px]  h-[100%] text-center text-4xl font-bold placeholder:text-sm placeholder:font-medium" min={1} max={5} maxLength={1}  type = "number" placeholder="Rating" name= "rating"></input>
                </div>
                
                
                <textarea style = {{whiteSpace: 'pre-wrap'}} className="w-[100%] h-[150px] text-start    border-2 p-6 rounded-md" maxLength={500} placeholder="Write a review..." name = "content"></textarea>
            </div>
            <button type="submit" className=" ml-auto w-[150px] h-[50px] border-2 rounded-md text-center font-bold">Submit</button>
        </form>
    )
}