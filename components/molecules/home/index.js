import axios from 'axios';
import dynamic from 'next/dynamic';
import { Router } from 'next/router';
import React, { useEffect, useState } from 'react'

import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Swal from 'sweetalert2';

const Modal = dynamic(() => import("@/components/atom/modal"));

const Index = () => {
    const [data, setData] = useState([])
    const [detail, setDetail] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [like, setLike] = useState(false)
    const [unLike, setUnlike] = useState(false)
    const [dataLike, setDataLike] = useState([])
    const [page, setPage] = useState('')

    console.log(page, 'data123')

    const getData = async () => {
        const respon = await fetch(`https://reqres.in/api/users?page=${page}`)
        const value = await respon.json()
        setData(value.data)
        console.log(value, 'cee')

        const datauser = value.data.slice(0, 4).map((item) => {
            return {
                first_name: item.first_name,
                last_name: item.last_name,
                like: like,
                unLike: unLike,
                melike: like,
                meunLike: unLike,
                email: item.email,
                avatar: item.avatar,
                id: item.id,
            }
        })
        setDataLike(datauser)
        console.log(value.data)
    }

    const handleModal = (id) => {
        setOpenModal(true)
        const movieObj = dataLike.find((x) => x.id === id);
        setDetail(movieObj)
    }

    const Login = () => {
        if (window.localStorage.getItem("LOGIN_TOKEN") !== null) {
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${window.localStorage.getItem("LOGIN_TOKEN")}`;
            console.log('already login')
        } else {
            window.localStorage.getItem("LOGIN_TOKEN", null);
            axios.defaults.headers.common["Authorization"] = null;
            return (
                <div className='text-center bg-slate-400 mt-[-20px]'>
                    <h3>Harap login terlebih dahulu agar bisa like , unlike dan detail</h3>
                </div>
            )
        }
    }

    const updateMovies = (id, updatedMovieObj) => {
        return dataLike.map((item, index) => {
            if (item.id !== id) {
                return item;
            }
            const updatedMoviesState = [
                ...dataLike.slice(0, index),
                updatedMovieObj,
                ...dataLike.slice(index + 1)
            ];
            return setDataLike(updatedMoviesState);
        });
    };

    const onLikeButton = (id) => {

        const movieObj = dataLike.find((x) => x.id === id);
        const updatedMovieObj = {
            avatar: movieObj.avatar,
            email: movieObj.email,
            first_name: movieObj.first_name,
            last_name: movieObj.last_name,
            id: movieObj.id,
            like: movieObj.like + 1,
            unLike: movieObj.unLike,
        };
        updateMovies(id, updatedMovieObj);

    }

    const onUnlikeButton = (id) => {

        const movieObj = dataLike.find((x) => x.id === id);
        const updatedMovieObj = {
            avatar: movieObj.avatar,
            email: movieObj.email,
            first_name: movieObj.first_name,
            last_name: movieObj.last_name,
            id: movieObj.id,
            like: movieObj.like,
            unLike: movieObj.unLike + 1
        };
        updateMovies(id, updatedMovieObj);

    }

    const loginCheck = async (window) => {
        //   const localStorageLoginToken = window.localStorage.getItem("LOGIN_TOKEN");
        if (window !== undefined) {
            if (window.localStorage.getItem("LOGIN_TOKEN") !== null) {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${window.localStorage.getItem("LOGIN_TOKEN")}`;
                console.log("Already Login");
            } else {
                window.localStorage.getItem("LOGIN_TOKEN", null);
                axios.defaults.headers.common["Authorization"] = null;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    timer: 11500,
                    text: 'Anda belum login!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            }
        }
    };

    useEffect(() => {
        loginCheck(window)
        getData()
    }, [page])

    return (
        <div className='w-full bg-blue-200 flex flex-col items-center'>
            <div className='w-3/4 flex flex-wrap justify-center '>
                {dataLike.map((item, index) =>
                    <div key={index} className='flex flex-col  w-[280px] bg-slate-200 m-3 rounded-xl' >
                        <div className='w-[100%] bg-slate-300 flex justify-center rounded-xl'>
                            <img src={item.avatar} className="rounded-t-xl w-full h-62 object-fill" />
                        </div>
                        <div className='flex justify-center mt-[-10px]'>
                            <h2 className='mr-2'>{item.first_name}</h2>
                            <h2>{item.last_name}</h2>
                        </div>
                        <div className='flex justify-center'>

                            {
                                Login() ?
                                    <div className='text-center bg-slate-400 mt-[-20px]'>
                                        <h3>Harap login terlebih dahulu agar bisa like unlike dan detail</h3>
                                    </div>
                                    :
                                    <div className='flex flex-col items-center'>
                                        <div className='flex justify-between  bg-slate-200 w-3/4'>
                                            <div className='cursor-pointer flex flex-col items-center'>
                                                <AiOutlineLike size={28} onClick={() => onLikeButton(item.id)} className="cursor-pointer" />
                                                <p className='mt-[10px]'>{item.like}</p>
                                            </div>
                                            <div className='cursor-pointer flex flex-col items-center'>
                                                <AiOutlineDislike size={28} onClick={() => onUnlikeButton(item.id)} className={unLike === true ? "text-blue-700" : "none"} />
                                                <p className='mt-[10px]'>{item.unLike}</p>
                                            </div>
                                        </div>
                                        <div className='flex justify-center'>
                                            <button onClick={() => handleModal(item.id)} type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-14 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                                Detail
                                            </button>
                                        </div>
                                    </div>
                            }

                        </div>

                    </div>
                )}
                {openModal && <Modal closeModal={setOpenModal} data={detail} handleModal={handleModal} />}

            </div>
            <div className='flex'>
                <a href="#" class="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => setPage("1")}    
                >
                    <svg aria-hidden="true" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                    Previous
                </a>
                <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => setPage("2")}    
                >
                    Next
                    <svg aria-hidden="true" class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
            </div>

        </div>
    )
}

export default Index