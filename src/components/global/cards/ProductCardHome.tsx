/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function ProductCardHome({ item }: any) {
    return (
        <Link href={`/products/${item?.product?.slug}`} className='rounded-3xl relative bg-white bg-cover flex flex-col items-center gap-5 p-3 group hover:shadow-md transition'>

            <Image src={item?.assets[0]?.source} alt={''} width={300} height={300} className='w-4/5 h-auto bg-white rounded-xl p-1 object-cover object-center group-hover:scale-105 transition' />

            <h2 className='text-center font-medium text-lg'>{item?.product?.name}</h2>

        </Link>
    )
}

export default ProductCardHome