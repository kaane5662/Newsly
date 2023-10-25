import { useEffect, useState } from "react";
import ArticleHeader from "../components/ArticleHeader";
import axios from "axios";

export default function Search(){

    interface articleProps {
        author_name: string,
        title: string,
        content: string,
        genre: string,
        id: number,
        image: string
    }

    const [Articles, setArticles] = useState<articleProps[]>([])
    const [searchParams, setSearchParams] = useState("")
    const [message, setMessage] = useState("")


    const getSearchResults = (params:String)=>{
        axios.put("http://localhost:8000/api/search/", {searchParam: params}).then((response)=>{
            console.log(response.data)
            setArticles(response.data)
            response.data?.length == 0 ? setMessage("Error 404"): null
        }).catch((error)=>{
            console.log(error.message)
            
        })
    }
    useEffect(()=>{
        const searchParams = window.location.search.split("?=")
        if(searchParams.length < 2) return
        setSearchParams(searchParams[1])
        getSearchResults(searchParams[1])
    },[window.location.search])


    return(
        <div className=" h-screen font-poppins">
            <div className=" p-12 flex flex-col gap-8">
                <h1 className="font-bold text-4xl">Showing results for {searchParams}</h1>
                <div className="relative flex justify-start gap-16 flex-wrap">
                    
                    {
                    Articles.length == 0 ?
                    (
                        <div className="absolute top-16 flex flex-col bottom-0 left-0 right-0 text-center gap-8">
                            <h1 className="font-bold text-6xl">{message}</h1>
                            <h3 className="text-2xl">   No matching articles with search query</h3>
                        </div>
                    )
                    : Articles.map((article, index)=>{
                        return(
                            <ArticleHeader key = {index} title = {article.title} author = {article.author_name} description = {article.content} type = {article.genre} id = {article.id} image={"http://localhost:8000/api" +article.image} />
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}