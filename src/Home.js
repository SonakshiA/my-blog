import BlogList from './BlogList';
import useFetch from "./useFetch";

const Home = () => {
    const {data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs')
 
    return ( 
        <div className="home">
           {error && <div> { error }</div>}
           {isPending && <div>Loading...</div>}
           {blogs && <BlogList  blogs = {blogs} title = "All blogs"/> }
           {/* <BlogList  blogs = {blogs.filter((blog) => blog.author=== 'mario')} title = "Mario's blogs" handleDelete={handleDelete}/>  */}
            {/* <button onClick={() => setName('Luigi')}>Change name</button> */}
        </div>
     );
}
 
export default Home;