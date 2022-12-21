import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState ,createContext} from 'react';
import axios from 'axios'
import 'antd/dist/reset.css';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import BinaryTreeEstimator from './Components/BineryTreeClassifierCompnent'
import LogisticRegressorEstimator from './Components/LogisticRegressorComponent';
export const DataContext = createContext({})

function App() {
  const [getMessage, setGetMessage] = useState({});
  const [getEducationCategory, setEducationCategory] = useState([]);
  const [getMaritalSatusCategory, setMaritalSatusCategory] = useState([]);

  useEffect(()=>{
    axios.get('/home').then(response => {
      console.log(response)
      const {education_category,marital_status_category} = response.data.message
      setEducationCategory(education_category)
      setMaritalSatusCategory(marital_status_category)
      setGetMessage(response)
    }).catch(error => {
      console.warn(error)
    })
  }, [])


  return (
    <Router>
      <div className="App">
        <Navigation/>
        <DataContext.Provider value={{EducationCategory:getEducationCategory,MaritalSatusCategory:getMaritalSatusCategory}}>
          <Routes>
            <Route path='/' element={getMessage.statusText==="OK"?<Home getMessage={getMessage.data && getMessage}/>:<h2 style={{height: '80vh',display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>Loading...</h2>}/>
              <Route path='/logistic' element={<LogisticRegressorEstimator />}/>
              <Route path='/binary' element={<BinaryTreeEstimator />}/>
          </Routes>
        </DataContext.Provider> 
      </div>
    </Router>
  );
}

export default App;
