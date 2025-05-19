import Link from 'next/link'
import { cn } from '@/lib/utils'
import React from 'react'

const Logo = ({className, spanDesign}: {className?:string,spanDesign?:string}) => {
  return (
   <Link href={'/'} className='inline-flex'>
    <h2 className={cn("text-2xl text-shop_dark_green tracking-wider hover:text-shop_light_green hoverEffect group fant-sans font-semibold",className)}>ShopCar
        <span className={cn('text-shop_light_green group-hover:text-shop_darkj-dark_green hoverEffect', spanDesign)}>T</span></h2>
   </Link>
  )
}

export default Logo
