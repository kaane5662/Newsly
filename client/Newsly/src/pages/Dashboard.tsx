import ArticleHeader from "../components/ArticleHeader";
import Featured from "../components/Featured";
import { useState, useEffect } from "react";
import axios from "axios";

interface articleProps {
    author_name: string,
    title: string,
    content: string,
    genre: string,
    id: number,
    image: string
}

export default function Dashboard(){
    const [Articles, setArticles] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pagesToDisplay, setPages] = useState(10)

    useEffect(()=>{
        axios.get("http://localhost:8000/api/articles/").then((response)=>{
            console.log(response.data)
            setArticles(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }, [])
    
    
    return(
        <main className="p-24 flex-col flex gap-12">
            <div className="flex flex-col gap-8 font-rcondensed text-center">
                <h3 className="font-semibold text-xl">The Blog</h3>
                <h1 className="font-bold text-6xl">Writing from freelancers and professionals</h1>
                <h1 className="text-2xl">The latest experiences from real people</h1>
            </div>
            <Featured></Featured>
            <div className="flex flex-wrap justify-first gap-8">
                {
                Articles.map((article: articleProps, index)=>{
                    return(
                        <ArticleHeader key = {index} title = {article.title} author = {article.author_name} description = {article.content} type = {article.genre} id = {article.id} image={"http://localhost:8000/api" +article.image} />
                    )
                })
                }
                
                
            
            </div>
            {/* <div className="justify-center flex items-center gap-8">
                <h3 className="font-bold text-lg w-6 rounded-lg  text-center" style={{backgroundColor: "black", color: "white"}}>1</h3>
                <h3 className="font-bold text-lg">2</h3>
                <h3 className="font-bold text-lg">3</h3>
                <h3 className="font-bold text-lg">4</h3>
                <h3 className="font-bold text-lg">5</h3>
            </div> */}
            
            
        </main>
    )
}