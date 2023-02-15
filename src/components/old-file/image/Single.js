import React from 'react'

const Single = ({data}) => {
  return (
    <a href={data.urls.regular}>
        <figure>
            <img 
              className='imge' 
              src={data.urls.small}
              alt={data.alt_description}
            />
        </figure>
    </a>
  )
}

export default Single