import './App.css';
import Body from './components/body/Body';
import Search from './components/search/Search';
import Image from './components/image/Image';
import useAxios from './hooks/useAxios';
import { createContext, useState } from 'react';


export const ImageContext = createContext()

function App() {

  const [SearchImg, setSearchImg] = useState("");
  const { response, isLoanding, error, fetchData } = useAxios(`https://api.unsplash.com/search/photos?page=1&query=street-photography&client_id=${process.env.REACT_APP_ACCESS_KEY}`);
  console.log(response) 

  const value = {
    response,
    isLoanding,
    SearchImg,
    setSearchImg,
    fetchData
  }

  return (
    <ImageContext.Provider value={value}>
    <div className="App">
     <Body>
      <Search/>
     </Body> 
     <Image />
    </div>       
    </ImageContext.Provider>
  );
}

export default App;
