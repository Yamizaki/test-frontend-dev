'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Loader2 } from 'lucide-react'

interface LoaderProps {
  open: boolean
}

const Loader = ({ open }: LoaderProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle></DialogTitle>
      <DialogContent className='border-none shadow-none text-white flex justify-center items-center bg-transparent'>
        <div className='flex flex-col justify-center items-center gap-2'>
          <Loader2 className='w-10 h-10 animate-spin text-white' />
          <p className='text-lg font-semibold'>Cargando...</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Loader
