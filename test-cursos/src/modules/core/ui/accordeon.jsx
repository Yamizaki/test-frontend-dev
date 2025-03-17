import React, { use, useState } from 'react'
import { IconArrowDown, IconCheck, IconPlay } from '../icons/icons';
import { sumDuration } from '../utils/sum-duration';
import { Link, useNavigate } from 'react-router-dom';

const Accordeon = ({ title, initialState = false, content = [], onClose }) => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(initialState);

    const amountCompleted = content.filter(item => item.completado).length;

    const totalDuration = sumDuration(content);

    return (
        <div className="w-full cursor-pointer">
            <input
                checked={open}
                type="checkbox"
                className="peer sr-only"
            />
            <div className="px-3 py-2" onClick={() => setOpen(!open)}>
                <label
                    className='w-full flex justify-between items-center bg-gray-100 font-semibold cursor-pointer'
                >
                    {title}
                    <IconArrowDown
                        height={20}
                        width={20}
                        className={`ml-4
                        ${open ? 'rotate-180' : ''}
                     transition-transform duration-150 ease-in-out `}
                    />
                </label>
                <small className='text-xs font-light '>{amountCompleted} / {content.length} | {totalDuration} </small>
            </div>

            {
                content.map((item, index) => {
                    const slug = item.titulo.toLowerCase().replace(/ /g, '-');
                    return (
                        <div
                            key={item.titulo}
                            className={`overflow-hidden h-0 bg-white peer-checked:h-full peer-checked:overflow-scroll transition-[height] duration-150 ease-in-out `}
                        >
                            <div className="flex items-center justify-between cursor-pointer hover:bg-gray-300 px-4 py-5"
                                onClick={() => { navigate(`/clases/${slug}`); onClose() }}
                            >

                                <div className="flex items-center gap-x-2.5">
                                    <IconPlay width={10} height={10} fill="#4E5258" />
                                    <p className="text-sm font-light">
                                        {item.titulo}
                                    </p>
                                    {item.completado && <IconCheck width={15} height={15} fill="#4DBD74" />}
                                </div>
                                <p className="text-xs font-light text-gray-500">
                                    {item.duracion.slice(0, 6)}
                                </p>

                            </div>

                        </div>)
                })
            }

        </div >

    )
}

export default Accordeon