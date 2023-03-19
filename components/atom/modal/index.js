import React from 'react'

import { AiOutlineClose } from "react-icons/ai";

const index = ({ closeModal, data, handleModal }) => {
    console.log(data, 'modal')
    return (
        <div className="modal">
            <div className="modal-main-edit-inventory">
                <div className="modal-main-row">
                    <div className="my-[1px] mr-[15px] flex justify-end text-[20px]" >
                        <h3 className='decoration-slate-800 cursor-pointer' onClick={() => closeModal(false)} ><AiOutlineClose/></h3>
                    </div>

                    <div className='flex m-[2px] bg-blue-200 justify-center '>
                        <div key={index} className='flex w-3/4  m-3 rounded-xl' >
                            <div className='flex flex-col'>
                                <div className='flex r mt-[-10px]'>
                                    <h2 className='mr-2'>{data.first_name}</h2>
                                    <h2>{data.last_name}</h2>
                                </div>
                                <h2>{data.email}</h2>
                            </div>

                            <div className='w-[530px] h-[310px] bg-slate-400 flex justify-center '>
                                <img src={data.avatar} className=" w-full h-112 object-fill" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index