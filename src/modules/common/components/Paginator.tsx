import React from 'react';

interface PaginatorProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
                                                 currentPage,
                                                 totalPages,
                                                 onPageChange,
                                             }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="flex justify-center my-4">
                <li className={`mr-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <button
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>
                {pageNumbers.map((pageNumber) => (
                    <li
                        key={pageNumber}
                        className={`mx-2 ${
                            pageNumber === currentPage ? 'opacity-100 font-bold' : 'opacity-50'
                        }`}
                    >
                        <button
                            className="px-4 py-2 rounded-lg bg-blue-500 text-white"
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
                <li
                    className={`ml-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <button
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export {Paginator};