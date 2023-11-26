import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams} from 'react-router-dom'
import Review from '../components/Review'
import WriteReview from '../components/WriteReview'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function Article(){

    const {id} = useParams()

    type ArticleData = {
        author: {
            username: String    
        },
        title: String
        content: String,
        genre: String,
        image: String,
        average_rating: String
    }

    type Review = {
        content: String,
        rating: String,
        author: {
            username: String
        }
    }


    // const [author, setAuthor] = useState("")
    // const [title, setTitle] = useState("")
    // const [content, setContent] = useState("")
    // const [Reviews, setReviews] = useState([])
    // const [genre, setGenre] = useState("")
    // const [image, setImage] = useState("")
    // const [averageRating, setAverageRating] = useState(0)

    const [Article, setArticle] = useState<ArticleData>()
    const [Reviews, setReviews] = useState<Review[]>()

    useEffect(()=>{

        axios.get(`http://localhost:8000/api/articles/${id}/`).then((response)=>{
            console.log(response.data)
            console.log(response.data.reviews)
            
            // const {author_name, content, title, genre, image, average_review_score} = response.data
            setReviews(response?.data?.reviews)
            response.data.average_rating = Math.floor(response.data.average_rating *10) / 10
            // response.data.reviews = null
            setArticle(response?.data)
            
        }).catch(error =>{
            console.log(error)
        })
    }, [])

    const loadReviews = () => {
        axios.get(`http://localhost:8000/api/articles/reviews/${id}/`).then((response)=>{
            console.log(response.data)
            
            setReviews(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

    return (
        <div className="px-40 py-24 gap-6   flex-col flex font-poppins ">
            <div className='flex justify-between'>
                <h1 className="text-4xl font-bold max-w-[50%] leading-[50px]">{Article?.title}</h1>
                <div className='flex gap-4 items-center justify-center'>
                    <FontAwesomeIcon className='text-black h-8' icon={faStar}></FontAwesomeIcon>
                    <h3 className='font-bold text-4xl'>{Article?.average_rating}</h3>
                </div>
            </div>
            <hr className = "h-[2px] text-black bg-black"></hr>
            <img src = {"http://localhost:8000/api"+Article?.image} className = "min-w-[100%] h-[450px] first-letter:flex flex-col gap-0 rounded-lg object-cover ">

            </img>
            <div className='flex justify-between'>
                <h2 className="text-2xl font-semibold italic  ">{Article?.author?.username} </h2>
                <div className="w-[150px] h-[30px] rounded-full font-bold border-2 border-black justify-center flex items-center    ">
                        <h2 className=" text-md font-poppins">{Article?.genre}</h2>
                </div>
            </div>
            
            <br></br>
            <hr className = "h-[2px] text-black bg-black"></hr>
            <p className=" text-xl leading-[45px] font-outfit" style={{whiteSpace: 'pre-line'   }}>{Article?.content}</p>
            <hr className = "h-[2px] text-black bg-black"></hr>
            
            
            
            
            
            
            <br></br>
            <h1 className="text-4xl font-bold">Reviews</h1>
            <WriteReview id = {id}></WriteReview>

            {Reviews?.reverse().map((review : any, index)=>{
                return (
                    <>
                    <Review key = {index} author = {review.author.username} content={review.content} rating={review.rating} ></Review>
                    <hr className='h-[1.5px]'></hr>
                    </>
                )
            })}
            <div className='flex justify-center items-center'>
                <button className='w-[250px] h-[50px] text-xl font-bold text-center border-black border-solid border-2 hover:bg-black hover:text-white rounded-full' onClick={()=> loadReviews()}>Load Reviews</button>
                
            </div>
            
        </div>
    )
}