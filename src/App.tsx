import React, { SelectHTMLAttributes, useEffect, useState } from 'react';
import './App.css';

function App() {
  //const [test, setTest] = React.useState("hello, hello, hello");

  // const [bible, setBible] = React.useState("");
  // const getBible = async() => {
  //   const response = await fetch('https://api.esv.org/v3/passage/text/?q=John+11&include-passage-references=false&include-verse-numbers=true&include-headings=false&include-passage-horizontal-lines=true&include-first-verse-numbers=true&include-footnotes=false&include-heading-horizontal-lines=true',
  //     {method: 'GET', headers:{'Authorization': 'Token d59a5361e2ab87063ed857904f5f6ce3d1869392'}}
  //   );
  //   const json = await response.json();
  //   setBible(json.passages);
  //   console.log(json);
  //   console.log("test");
  // }

  function getBible(chapter :string){
    

  }

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) : void=>{
    console.log(event.target.value);

  }

  //useEffect(()=>{getBible()},[]);
  return (
    <div className="container">
      <h1 className="box-decoration-slice">My Bible</h1>
      <select onChange={onChange}>
        <option value="John">John</option>
        <option value="Ruth">Ruth</option>
      </select>
      <div className="container mx-auto">
      {bible? bible.toString().split('[').map(place => <p> {place} </p>) 
    : "Loading"}
    {/* {
      test? test.split(",").map(place => <p> {place} </p>) 
      : "test"
      
    } */}
      </div>
      
    </div>
  );
}

export default App;
