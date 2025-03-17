
export const Drawer = ({
  isOpen,
  onClose,
  width = 320,
  children,
  backgroundColor = 'rgba(0,0,0,0.7)'
}) => {
  return (
    <div
      className={`
        fixed  z-50 flex h-full w-full
        ${isOpen ? '' : 'pointer-events-none'}`
      }
    >
      <div
        className={`
          fixed inset-0 z-40 h-full bg-black opacity-0 transition-opacity duration-300 cursor-pointer
          ${backgroundColor},
          ${isOpen ? 'opacity-50' : 'opacity-0'}`
        }
        onClick={onClose}
      ></div>
      <div
        style={{ width: `${width}px` }}
        className={`
          fixed top-0  z-50 flex h-full transform-gpu bg-gray-100 transition-transform duration-300 ease-in-out right-0
          ${isOpen
            ? 'translate-x-0'
            : 'translate-x-full'}
        `}
      >
        <div className="flex w-full flex-col bg-gray-100  shadow-xl dark:border-gray-700 dark:bg-gray-800">
          {children}
        </div>
      </div>
    </div>
  )
}
