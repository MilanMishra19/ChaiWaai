import { clientReviews } from "../constants";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import Section from "../sections/Section";
import { useState } from 'react';
import styled from 'styled-components'; 


const CommunityPage = () => {
    const [blogs, setBlogs] = useState([]); 
    const [newBlog, setNewBlog] = useState({ title: "", content: "" });

    const handleBlogSubmit = (e) => {
        e.preventDefault();
        const newBlogPost = {
            id: blogs.length + 1, 
            title: newBlog.title,
            author: "Community Member", 
            content: newBlog.content,
        };
        setBlogs([...blogs, newBlogPost]);
        setNewBlog({ title: "", content: "" }); 
    };


    return (
        <Section id="community">
            <Header />
            <h3 className="text-[2rem] leading-normal md:text-[2.5rem] font-serif text-center">Community</h3>
            <p className="text-center body-2">Hear from our beloved customers and more!</p>

            <div className="client-container">
                {clientReviews.map((item) => (
                    <div key={item.id} className="client-review">
                        <div>
                            <p className="text-black font-light">{item.review}</p>
                            <div className="client-container">
                                <div className="flex gap-3">
                                    <img src={item.img} alt={item.name} className="w-12 h-12 rounded-full" />
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-black">{item.name}</p>
                                        <p className="text-black md:text-base text-sm font-light">{item.position}</p>
                                        <div className="flex self-end items-center gap-2">
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <img key={index} src="/star (2).svg" alt="star" className="w-5 h-5" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Blog Section */}
            <BlogSection>
                <h2 className="text-[1.75rem] leading-[2.5rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight text-center font-serif">Community Blog</h2>

                {/* Display Blogs */}
                {blogs.map((blog) => (
                    <BlogCard key={blog.id}>
                        <h3 className="text-xl font-medium">{blog.title}</h3>
                        <p className="text-gray-600 text-sm">By {blog.author}</p>
                        <p className="mt-2">{blog.content}</p>
                    </BlogCard>
                ))}

                {/* Blog Form */}
                <BlogForm onSubmit={handleBlogSubmit}>
                    <h3 className="text-[2rem] leading-normal md:text-2xl text-xl mb-2">Share Your Chai Story!</h3>
                    <input
                        type="text"
                        placeholder="Blog Title"
                        value={newBlog.title}
                        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                        required
                        className="border border-green-300 px-3 py-2 rounded"
                    />
                    <textarea
                        placeholder="Your Chai Experience..."
                        value={newBlog.content}
                        onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                        required
                        className="border border-green-300 px-3 py-2 rounded"
                    />
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Post Blog
                    </button>
                </BlogForm>
            </BlogSection>
            <Footer />
        </Section>
    )
}

const BlogSection = styled.div`
    border: 1px solid #754641 rounded;
    padding: 20px;
    margin-top: 20px;
    background-color: #F5E6DA;
`;

const BlogCard = styled.div`
    border: 1px solid #754641;
    padding: 15px;
    margin-bottom: 10px;
    background-color: #D2A679; // Slightly darker background for cards
`;

const BlogForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;

    input,
    textarea {
        padding: 8px;
        border: 1px solid #000000;
    }

    button {
        background-color: #f0c808; // Chai-inspired yellow
        color: white;
        padding: 10px 15px;
        border: none;
        cursor: pointer;
    }
`;

export default CommunityPage;
