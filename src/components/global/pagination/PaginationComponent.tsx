'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md'

interface PaginationControlsProps {
    length: number
    hasNextPage: boolean
    hasPrevPage: boolean
    link: string
}

const PaginationControls: FC<PaginationControlsProps> = ({ length, hasNextPage, hasPrevPage, link }) => {

    const commonBtnStyles = 'flex items-center justify-center text-center  border-2 border-gray-200 hover:border-primary rounded-lg text-[#606060] hover:text-primary transition duration-200 ease-in-out p-1.5 hover:shadow-sm'
    const disabledBtnStyles = 'opacity-50 cursor-not-allowed'

    const router = useRouter()
    const searchParams = useSearchParams()

    const page = Number(searchParams.get('page') ?? '1')
    const per_page = Number(searchParams.get('per_page') ?? '24')
    const totalPages = Math.ceil(length / per_page)

    // Helper function to navigate to a specific page
    const navigateToPage = (targetPage: number) => {
        if (targetPage < 1 || targetPage > totalPages) return
        router.push(`${link}?page=${targetPage}&per_page=${per_page}#items`)
    }

    // Generate the page numbers to display
    const getDisplayedPages = () => {
        const pageNumbers = []
        const maxPagesToShow = 5
        const halfWindow = Math.floor(maxPagesToShow / 2)

        let start = Math.max(1, page - halfWindow)
        let end = Math.min(totalPages, page + halfWindow)

        // Adjust start/end if near the boundaries
        if (page <= halfWindow) {
            end = Math.min(maxPagesToShow, totalPages)
        } else if (page + halfWindow >= totalPages) {
            start = Math.max(1, totalPages - maxPagesToShow + 1)
        }

        for (let i = start; i <= end; i++) {
            pageNumbers.push(i)
        }
        return pageNumbers
    }

    const displayedPages = getDisplayedPages()

    return (
        <div className='flex items-center gap-1'>
            {/* First and Previous arrows */}
            <button
                className={`${commonBtnStyles} ${!hasPrevPage ? disabledBtnStyles : 'bg-white'}`}
                disabled={!hasPrevPage}
                aria-label="First Page"
                onClick={() => navigateToPage(1)}
            >
                <MdKeyboardDoubleArrowLeft size={20} />
            </button>

            <button
                className={`${commonBtnStyles} ${!hasPrevPage ? disabledBtnStyles : 'bg-white'}`}
                disabled={!hasPrevPage}
                aria-label="Previous Page"
                onClick={() => navigateToPage(page - 1)}
            >
                <MdKeyboardArrowLeft size={20} />
            </button>

            {/* Page numbers */}
            {displayedPages.map((pageNum) => (
                <button
                    key={pageNum}
                    className={`text-sm aspect-square w-8 ${commonBtnStyles} ${pageNum === page ? 'bg-primary border-primary hover:text-white hover:bg-primaryDark text-white hover:border-primaryDark' : 'bg-white'}`}
                    aria-label={`Page ${pageNum}`}
                    onClick={() => navigateToPage(pageNum)}
                >
                    {pageNum}
                </button>
            ))}

            {/* Next and Last arrows */}
            <button
                className={`${commonBtnStyles} ${!hasNextPage ? disabledBtnStyles : 'bg-white'}`}
                disabled={!hasNextPage}
                aria-label="Next Page"
                onClick={() => navigateToPage(page + 1)}
            >
                <MdKeyboardArrowRight size={20} />
            </button>

            <button
                className={`${commonBtnStyles} ${!hasNextPage ? disabledBtnStyles : 'bg-white'}`}
                disabled={!hasNextPage}
                aria-label="Last Page"
                onClick={() => navigateToPage(totalPages)}
            >
                <MdKeyboardDoubleArrowRight size={20} />
            </button>
        </div>
    )
}

export default PaginationControls
