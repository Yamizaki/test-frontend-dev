import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useCourse } from '../hooks/use-course'

export const CoursePage = () => {

    const params = useParams();
    const { course } = useCourse()

    const addSlug = course.map((item) => {
        return {
            ...item,
            clases: item.clases.map((clase) => {
                return {
                    ...clase,
                    slug: clase.titulo.toLowerCase().replace(/ /g, '-')
                }
            })
        }
    })

    const selectClass = addSlug
        .flatMap(modulo => modulo.clases)
        .find(clase => clase.slug === params.course);


    return (
        <div className=''>
            <video className='w-full aspect-auto' controls src={selectClass?.video} autoPlay loop muted></video>
            <div className="p-4">
                <h1 className='text-xl font-semibold mt-4'>{selectClass?.titulo}</h1>
                <p className='text-gray-500'>{selectClass?.descripcion}</p>
            </div>

        </div >
    )
}
