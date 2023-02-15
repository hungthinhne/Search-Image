import React from 'react'

const Loading = ({item}) => {
  return (
    [...Array(item).keys()].map(() => (
        <div className="main">
            <figure className='imge load'></figure>
        </div>
    ))
  )
}

export default Loading