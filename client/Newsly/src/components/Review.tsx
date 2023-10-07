import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

interface myProps {
    author: String,
    rating: Int8Array,
    content: String  
}


export default function Review({author, rating, content}: myProps){
    return(
        <div className="p-4 px-12 border-opacity-30 flex gap-4 flex-col rounded-md" style = {{whiteSpace: "pre-line"}}>
            <div className="flex gap-2 items-center justify-between">            
                <h1 className="text-xl font-bold">{author}</h1>
                <div className="flex  items-center gap-3 font-rcondensed">
                    <FontAwesomeIcon icon={faStar} className="w-5 h-5"/>
                    <h2 className="text-xl font-semibold">{rating}</h2>
                </div>
            </div>
            
            <p className=" leading-[30px] text-lg text-gray-500  font-rcondensed">{content}</p>
        </div>
    )
}