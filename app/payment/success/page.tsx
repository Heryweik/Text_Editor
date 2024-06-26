

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check, XIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function SuccessPage() {
  return (
    <div className='w-full min-h-[80vh] flex items-center justify-center mt-[10vh]'>
        <Card className='w-[350px]'>
            <div className='p-6'>
                <div className='w-full flex justify-center'>
                    <Check className='w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2'/>
                </div>

                <div className='mt-3 text-center sm:mt-5 w-full'>
                    <h3 className='text-lg leading-6 font-medium'>Payment Successfull</h3>
                    <div className='mt-2'>
                        <p className='text-sm text-muted-foreground'>Congrats on your subscription, please check your mail for further instructions</p>
                    </div>

                    <div className='mt-5 sm:mt-6 w-full'>
                        {/* El asChild es un prop que se le pasa al componente Button, el cual permite que el componente Button pueda recibir un componente hijo, en este caso un Link de Next.js */}
                        <Button className='w-full' asChild>
                            <Link href='/'>
                                Go back to Dashboard
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    </div>
  )
}
