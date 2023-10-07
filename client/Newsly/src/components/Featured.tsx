export default function Featured(){
    return (
        <div className="min-w-[100%] h-[650px] relative bg-black rounded-xl hover:scale-105 hover:cursor-pointer     duration-500  ">
            <img src = "testimage.jpg" className = "min-w-[100%] h-[100%] flex flex-col gap-0 rounded-xl object-cover ">

            </img>

            <div className="left-10 bottom-10 absolute flex flex-col gap-4 font-rcondensed text ">
                <h3 className=" text-white text-xl font-semibold drop-shadow-xl">ree123</h3>
                <h1 className=" text-white text-4xl font-bold">Blog Title</h1>
                <h2 className=" text-white text-2xl font">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus facilis neque quasi repellat culpa quisquam impedit.</h2>
                <div className="w-[150px] h-[30px] rounded-full font-bold border-2 border-white justify-center flex items-center    ">
                    <h2 className=" text-white text-md font-poppins">Economics</h2>
                </div>

            </div>

        </div>
        
    )
}
