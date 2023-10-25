import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Featured(){

    interface Featured {
        author_name: String,
        title: String,
        content: String,
        average_review_score: Number,
        genre: String,
        image: String,
        id: Number
    }
    
    const getFeaturedData = ()=>{
        axios.get("http://localhost:8000/api/getfeatured/").then((response)=>{
            console.log(response.data)
            setFeaturedData(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        getFeaturedData()
    },[])

    const [FeaturedData, setFeaturedData] = useState<Featured>()
    const navigate = useNavigate()
    return (
        <div onClick={()=> navigate(`/articles/${FeaturedData?.id}`)} className="min-w-[100%] h-[650px] relative bg-opacity-50 bg-black rounded-xl hover:scale-105 hover:cursor-pointer     duration-500  ">
            <img src = {`http://localhost:8000/api${FeaturedData?.image}`} className = "min-w-[100%] h-[100%] duration-500 hover:blur-sm flex flex-col gap-0 rounded-xl object-cover ">

            </img>
        

           
            <div className="right-10 absolute top-10 flex gap-4 items-center justify-center">
                <FontAwesomeIcon className="h-8 text-white" icon={faStar}></FontAwesomeIcon>
                <h3 className="text-4xl font-bold text-white">{ (Math.floor(FeaturedData?.average_review_score * 10)/10)}</h3>
            </div>

            <div className="left-10 bottom-10 absolute flex flex-col gap-4 font-rcondensed text ">
                <h3 className=" text-white text-xl font-semibold drop-shadow-xl">{FeaturedData?.author_name}</h3>
                <h1 className=" text-white text-4xl font-bold">{FeaturedData?.title}</h1>
                <h2 className=" text-white text-2xl font">{FeaturedData?.content?.substring(0,175)+"..."}</h2>
                <div className="w-[150px] h-[30px] rounded-full font-bold border-2 border-white justify-center flex items-center    ">
                    <h2 className=" text-white text-md font-poppins">{FeaturedData?.genre}</h2>
                </div>

            </div>

        </div>
        
    )
}
