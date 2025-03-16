import React from 'react'
import { IconX } from '../icons/icons'
import Accordeon from '../ui/accordeon'
import { useCourse } from '../../course/hooks/useCourse'

export const Sidebar = ({ onClose }) => {
    const { course } = useCourse()
    console.log(course);

    return (
        <div className='shadow-md h-screen'>
            <div className="flex justify-between items-center bg-white px-3 py-4">
                <h4 className='font-bold'>Contenido del curso</h4>
                <div className="block md:hidden cursor-pointer text-gray-400" onClick={onClose}>
                    <IconX />
                </div>

            </div>
            <div className="flex flex-col ">
                {
                    course.map((item) => (
                        <Accordeon title={item.titulo} content={item.clases} initialState={true} />
                    ))
                }
            </div>


        </div>
    )
}
