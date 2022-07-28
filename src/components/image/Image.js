import React, { useContext } from 'react'
import { ImageContext } from '../../App'
import './image.css'
import Loading from './Loading';
import Single from './Single';

const Image = () => {

  const { response, isLoading, SearchImg, setSearchImg } = useContext(ImageContext);

  return (
    <>
      <div className="center">
        <h3 className='mt-20'>{SearchImg ? `Kết quả của "${SearchImg}"` :  ""  }</h3>
      </div>
      <div className="main">
        {/* <figure><img className='imge' src="https://images.unsplash.com/photo-1587383378486-83d683d9d02d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" /></figure>
        <figure><img className='imge' src="https://images.unsplash.com/photo-1588395856595-235a6a1ccca8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" /></figure>
        <figure><img className='imge' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/10558/photo-1587825027984-c4476461c8f9.jpg" /></figure>
        <figure><img className='imge' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/10558/photo-1588503391289-5f7b28258022.jpg" /></figure>
        <figure><img className='imge' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/10558/photo-1586603234056-2158d916b705.jpg" /></figure>
        <figure><img className='imge' src="https://images.unsplash.com/photo-1587462829651-7fd0208d766e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" /></figure>
        <figure><img className='imge' src="https://images.unsplash.com/photo-1585652505968-6266ecf26133?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" /></figure>
        <figure><img className='imge' src="https://images.unsplash.com/photo-1586450463118-8d0cddab713f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" /></figure> */}
        {isLoading ? <Loading item={10} /> : response.map((data, key) => <Single key={key} data={data}/>)}
      </div>

      
    </>
  )
}

export default Image