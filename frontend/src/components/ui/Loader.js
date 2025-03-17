export const Loader = ({ color = "", size = "24px" }) => {
  return (
    <div className='grid place-content-center'>
      <div className="flex flex-row gap-1">
        <div style={{ backgroundColor: color, height: size, width: size }} className='rounded-full bg-white animate-bounce'></div>
        <div style={{ backgroundColor: color, height: size, width: size }} className='rounded-full bg-white animate-bounce [animation-delay:-.3s]'></div>
        <div style={{ backgroundColor: color, height: size, width: size }} className='rounded-full bg-white animate-bounce [animation-delay:-.5s]'></div>
      </div>
    </div>
  )
}
