import { useNavigate } from "react-router-dom"

export default function CreationHeader({title, id, image}: any){
    const navigate = useNavigate()
    return(
        <div className="flex flex-wrap gap-5 justify-between" onClick={() => navigate(`/create/edit/${id}/`)}>
            <div className="w-[230px] h-[230px] bg-black flex rounded-lg justify-center items-center hover:scale-105  duration-500 cursor-pointer relative">
                <img className="w-[230px] h-[230px] rounded-lg object-cover opacity-70" src = {"http://localhost:8000/api"+image}></img>
                <h1 className="absolute text-white text-xl font-bold left-5 bottom-5">{title?.substring(0,35)+"..."}</h1>
            </div>
        </div>
    )
}