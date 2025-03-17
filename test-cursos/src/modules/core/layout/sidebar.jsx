import React from 'react'
import { IconX } from '../icons/icons'
import Accordeon from '../ui/accordeon'
import { useCourse } from '../../course/hooks/use-course'
import { courseStore } from '../../course/store/course-store'


export const Sidebar = ({ onClose }) => {
    const { course } = courseStore()

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
                    course.map((item, index) => (
                        <Accordeon key={index} title={item.titulo} content={item.clases} initialState={true} onClose={onClose} />
                    ))
                }
            </div>


        </div>
    )
}
