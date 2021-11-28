import React from "react";
import Post from "./Post";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const PostContainer = ({ username }) => {
    const [PostInfo, setPostInfo] = useState({ data: null });
    const [pgs, setpgs] = useState(0);
    const pages = useRef();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getAll = async () => {
            const { data: response } = await axios.get('https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=10&page=0', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response);
            setPostInfo({ data: response.data });
            pages.current = response.pages;
        }

        getAll();
    }, []);

    useEffect(() => {
        const getAll = async () => {
            const { data: response } = await axios.get(`https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=10&page=${pgs}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setPostInfo({ data: response.data });
            pages.current = response.pages;
        }

        getAll();
    }, [pgs]);

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
            {PostInfo.data && PostInfo.data.map((it) => <Post key={it._id} object={it} username={username} />)}
            <button className="p-4 bg-gradient-to-l from-gray-600 to-green-500 text-white"
            
                onClick={() => {
                    setpgs(pgs - 1);
                    if (pgs === 0) setpgs(pgs);
                }}> Pagina anterior </button>
            <br/>
            <button className="p-4 bg-gradient-to-r from-gray-600 to-green-500 text-white"
                onClick={() => {
                    setpgs(pgs + 1);
                    if (pgs >= pages) {
                        setpgs(pgs - 1);
                    }
                    
                }}> Pagina siguiente </button>
            <br/>
            <br/>
        </div>
    );
};

export default PostContainer;