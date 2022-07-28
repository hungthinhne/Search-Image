import React, { useContext, useState } from 'react'
import { ImageContext } from '../../App';
import './search.css'

const Search = () => {

  const {fetchData, setSearchImg} = useContext(ImageContext)
 
  const [ImageSearch, setImageSearch] = useState("");

  const ChangeSearch = (e) => {
      setImageSearch(e.target.value)
  }

  const handleSearch = () => {
      fetchData(`https://api.unsplash.com/search/photos?page=1&query=${ImageSearch}&client_id=${process.env.REACT_APP_ACCESS_KEY}`);   
      setSearchImg(ImageSearch);
  }

  const handleEnter = (e) => {

     if (!ImageSearch) {
      return
     }
     else if(e.key === 'Enter') {
      fetchData(`https://api.unsplash.com/search/photos?page=1&query=${ImageSearch}&client_id=${process.env.REACT_APP_ACCESS_KEY}`);  
      setSearchImg(ImageSearch); 
     } 
  }

  return (
   <>
     <div className="search">
        <input onKeyDown={handleEnter} onChange={ChangeSearch} className='search-box' type="text" placeholder='Nhập từ khóa cần tìm của bạn..' />
        <button onClick={handleSearch} disabled={!ImageSearch} className='search-btn'>Tìm Kiếm</button>
     </div>
   </>
  )
}

export default Search