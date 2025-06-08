import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Logo from './Logo'
import { SignInButton } from '@clerk/nextjs'
import { Button } from './ui/button'



const NoAccess = ({
  details = "Log in to view your cart items and checkout. Don't miss out on your favorite product!",
}: {details?: string}) => {
  return (
    <div className='flex items-center justify-center py-12 md:py-32 bg-gray-100 p-4'>
        <Card className='w-full max-w-md p-5'>

            <CardHeader className='flex items-center flex-col'>
                <Logo/>
                <CardTitle className=' text-2xl font-bold text-center'>Welcome Back!</CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-center font-medium text-darkColor/80'>{details}</p>
          
            <SignInButton mode='modal'>
                <Button className='w-full' size="lg">Sign in</Button>
            </SignInButton>
              </CardContent>
            </Card>      
    </div>
  )
}

export default NoAccess
