import { useNavigate } from "react-router-dom"
import { redirect } from "react-router-dom"

export default function ArticleHeader({author, title, description, type, id, image}: any){
    const navigate = useNavigate()
    return (
        <div className=" w-[420px] h-[auto] gap-4 flex flex-col overflow-hidden font-rcondensed hover:shadow-2xl duration-500 cursor-pointer py-8 hover:rounded-lg hover:scale-105" onClick={()=> navigate(`/articles/${id}`)}>
            <img src = {image} className = "min-w-[100%] h-[200px] first-letter:flex flex-col gap-0 rounded-sm object-cover ">

            </img>
            <div className="flex flex-col gap-4 p-4">
                <h3 className=" text-md font-semibold">{author}</h3>
                <h1 className=" text-2xl font-bold">{title}</h1>
                <h2 className=" text-lg font">{description.substring(0,150)+"..."}</h2>
                <div className="w-[150px] h-[30px] rounded-full font-bold border-2 border-black justify-center flex items-center    ">
                        <h2 className=" text-md font-poppins">{type}</h2>
                </div>

            </div>
            
        </div>
    )
}