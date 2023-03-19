import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Router from "next/router";

const Index = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const onSubmit = (e) => {
        e.preventDefault();
        loginUser(email, password)
    }

    const loginUser = async (email, password) => {
        await axios.post(`https://reqres.in/api/login`, {
            email: email,
            password: password,
          })
          .then((response) => {
            //console.log(response);
            const data = response.data;
            console.log(data)
              window.localStorage.setItem("LOGIN_TOKEN", JSON.stringify(data));
              Router.push('/')
              Swal.fire({
                icon: 'success',
                title: 'Login Successfully!',
                showConfirmButton: false,
                timer: 1500
              })
          })
          .catch((error) => {
            console.log(error);
          });
      };

       const loginCheck = async (window) => {
        //   const localStorageLoginToken = window.localStorage.getItem("LOGIN_TOKEN");
        if (window !== undefined) {
          if (window.localStorage.getItem("LOGIN_TOKEN") !== null) {
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${window.localStorage.getItem("LOGIN_TOKEN")}`;
            console.log("Already Login");
          } else {
            window.localStorage.setItem("LOGIN_TOKEN", null);
            axios.defaults.headers.common["Authorization"] = null;
            Router.push('/login')
      
            console.log("Not Login");
          }
        }
      };
      

    return (
        <div className='flex justify-center  w-full h-[350px]'>
            <div className='w-[530px] bg-slate-100 flex justify-center'>
                <div className='w-[400px] mt-8 h-full'>
                    <form onSubmit={onSubmit}>
                        <div className="mb-6">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" id="email"  onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eve.holt@reqres.in" />
                        </div>
                        <div className="mb-6">
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="cityslicka" />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Index 