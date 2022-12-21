import React from "react";
import { Button } from 'antd';


const Home = (getMessage) => {
    return (
        <header className="App-header">
        <h2>{getMessage.getMessage.data && getMessage.getMessage.data.message.header}</h2>
        <div>{getMessage.getMessage.status && getMessage.getMessage.status === 200 ? <div>
          <h5 style={{'width':'50%',margin:'0 auto'}}>{getMessage.getMessage.data &&  getMessage.getMessage.data.message.content}</h5>
          <Button style={{margin:'1rem 0'}} type="primary">Click here</Button>
        </div>
          :<h3>LOADING...</h3>}</div>
      </header>
    )
}

export default Home