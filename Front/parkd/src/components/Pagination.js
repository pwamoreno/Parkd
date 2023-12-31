import React from 'react';
import './Pagination.css';

const Pagination = (
    {
        totalTables, 
        entriesPerTable, 
        setCurrentPage, 
        currentPage
    }) => {

    let tablePages = [];

    for(let i = 1; i<= Math.ceil(totalTables/entriesPerTable); i++ ){
        tablePages.push(i)
    }

  return (
    <div className='pagination'>
        {
            tablePages.map((page, index) => {
                return (
                    <button 
                        className={page === currentPage ? 'active' :  ''} 
                        key={index} 
                        onClick={() => setCurrentPage(page)}>{page}
                    </button>
                )
            })
        }
    </div>
  )
}

export default Pagination