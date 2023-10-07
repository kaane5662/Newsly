import axios from "axios"
import { useState, useEffect } from "react"
import { useFetcher, useNavigate, useParams } from "react-router-dom"
import { getAuthToken } from "../components/getAuthToken"
import { text } from "@fortawesome/fontawesome-svg-core"

export default function Edit(){
    const navigate = useNavigate()
    
    const {id} = useParams()

    const [title, setTitle] = useState("poerkgop")
    const [content, setContent] = useState("eorijgjpore")
    const [genre, setGenre] = useState("g895945")
    const [image, setImage] = useState("")
    // const [docId, setDocId] = useState()

    const getArticleEditions = () => {
        axios.get(`http://localhost:8000/api/create/edit/${id}/` ,{
            headers: {
                Authorization: `Token ${getAuthToken()}`
            },
        }).then((response)=>{
            console.log(response.data)
            const {content, title, genre, image} = response.data
            setTitle(title)
            setContent(content)
            setGenre(genre)
            setImage(image)
            // setDocId(id)

        }).catch(error =>{
            console.log(error)
        })
    }

    const saveArticleEditions = () => {
        console.log(title)
        console.log(content)
        console.log(genre)
        const data = {
            title,
            content,
            genre
        }
        
        axios.put(`http://localhost:8000/api/create/edit/${id}/`, data,{
            headers: {
                Authorization: `Token ${getAuthToken()}`
            },
        }).then((response)=>{
            window.location.reload()
            // setDocId(id)

        }).catch(error =>{
            console.log(error)
        })
    }

    const uploadPhotos = (e:any) =>{
        e.preventDefault(); 
        console.log(e.target.files[0])
        let imageData = new FormData();
        imageData.append("image", e.target.files[0], e.target.files[0].name)
        axios.post(`http://localhost:8000/api/create/uploadimage/${id}/`, imageData ,{
            headers: {
                Authorization: `Token ${getAuthToken()}`,
                "Content-Type": 'multpart/form-data'
            },
        }).then((response)=>{
            window.location.reload()
            // setDocId(id)

        }).catch(error =>{
            console.log(error)
        })
    }

    const deleteArticle = () =>{
        axios.delete(`http://localhost:8000/api/create/edit/${id}/`, {
            headers: {
                Authorization: `Token ${getAuthToken()}`
            },
        }).then((response)=>{
            navigate("/create")
            // setDocId(id)

        }).catch(error =>{
            console.log(error)
        })
    }

    const publishArticle = () =>{
        const data = {
            title,
            content,
            genre,
            image
        }
        axios.post(`http://localhost:8000/api/create/edit/${id}/`, data ,{
            headers: {
                Authorization: `Token ${getAuthToken()}`
            },
        }).then((response)=>{
            navigate("/create")
            // setDocId(id)

        }).catch(error =>{
            console.log(error)
        })
    }

    const uploadPhoto = (e:any) =>{
        console.log(e.target.files[0])
        setImage(e.target.files[0])
    }

    useEffect(()=>{

        getArticleEditions()
    }, [])
    

    return (
        <div className="px-40 py-24 gap-6   flex-col flex font-poppins ">
            <textarea className="text-4xl font-bold max-w-[50%] leading-[50px] p-4 h-auto border-2 rounded-md  " value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} ></textarea>
            <hr className = "h-[2px] text-black bg-black"></hr>
            <div className="relative h-auto w-auto flex items-center justify-center">
                <img src = {"http://localhost:8000/api"+image} className = "min-w-[100%] h-[450px] first-letter:flex flex-col gap-0 rounded-lg object-cover "></img>
                <input className=" absolute" type="file" onChange={(e)=> uploadPhotos(e) } ></input>
            </div>
            
            <div className='flex justify-between'>
                {/* <h2 className="text-2xl font-semibold italic  ">{author} </h2> */}
                
                <input className=" text-md font-poppins p-2 border-2 font-bold rounded-full w-auto text-center " value={genre} placeholder="Product" onChange={(e) => setGenre(e.target.value)} ></input>   
                
            </div>
            
            <br></br>
            <hr className = "h-[2px] text-black bg-black"></hr>
            <textarea className=" text-xl leading-[45px] font-outfit border-2 rounded-md p-4 min-h-[750px] h-auto   " style={{whiteSpace: 'pre-line'   }} value={content} placeholder="Content" onChange={(e) => setContent(e.target.value)} ></textarea>
            <hr className = "h-[2px] text-black bg-black"></hr>
            
            
            
            <div className="flex justify-between">
                <button className="w-[200px] h-[50px] bg-red-900 text-white rounded-full text-xl font-bold hover:scale-105 duration-500" onClick={()=> deleteArticle()}>Delete</button>
                <button className="w-[200px] h-[50px] bg-black text-white rounded-full text-xl font-bold hover:scale-105 duration-500" onClick={()=> saveArticleEditions()}>Save</button>
                <button className="w-[200px] h-[50px] border-2 border-black rounded-full text-xl font-bold hover:scale-105 duration-500" onClick={()=> publishArticle()}>Publish</button>
            </div>
            
            
            <br></br>
            
            
        </div>
    )
    
}