import { useState } from 'react';
import { IconLogout, IconUser, IconX } from '../icons/icons';

export const Avatar = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (

        <div className="relative" onClick={() => setIsOpen(false)}>

            <div
                className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border border-gray-400 hover:shadow-lg"
                onClick={handleClick}
            >
                <IconUser />
            </div>
            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-[135px] bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50 px-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="absolute top-2 right-2 cursor-pointer"
                        onClick={() => setIsOpen(false)}>
                        <IconX />
                    </div>

                    <div className="text-center text-sm pt-4">
                        <strong className='font-light'>Usuario</strong>
                    </div>
                    <div className="flex justify-center mt-2 text-sm cursor-pointer"
                        onClick={onLogout}>
                        Cerrar Sesión
                    </div>
                </div>
            )}
        </div>
    );
};
