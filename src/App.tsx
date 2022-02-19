import React, { SelectHTMLAttributes, useEffect, useState } from 'react';
import './App.css';
import Keep from './Keep';

function App() {
  const [bible, setBible] = React.useState("");
  const [book, setBook] = React.useState("");
  const [chapter, setChapter] = React.useState("");
  const [verse, setVerse] = React.useState("");

  // const getBible = async() => {
  //   const response = await fetch('https://api.esv.org/v3/passage/text/?q=John+11&include-passage-references=false&include-verse-numbers=true&include-headings=false&include-passage-horizontal-lines=true&include-first-verse-numbers=true&include-footnotes=false&include-heading-horizontal-lines=true',
  //     {method: 'GET', headers:{'Authorization': 'Token d59a5361e2ab87063ed857904f5f6ce3d1869392'}}
  //   );
  //   const json = await response.json();
  //   setBible(json.passages);
  //   console.log(json);
  //   console.log("test");
  // }

  async function getBible(chapter :string = 'Genesis'){

    const response = await fetch(`https://api.esv.org/v3/passage/text/?q=${chapter}&include-passage-references=false&include-verse-numbers=true&include-headings=false&include-passage-horizontal-lines=true&include-first-verse-numbers=true&include-footnotes=false&include-heading-horizontal-lines=true`,
      {method: 'GET', headers:{'Authorization': 'Token d59a5361e2ab87063ed857904f5f6ce3d1869392'}}
    );

    const json = await response.json();
    setBible(json.passages);
    console.log(json);
    // console.log("test");

  }

  async function getBook(){

    const response = await fetch(`https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/books`,
    {method: 'GET', headers:{'api-key': 'a4a596acd24972af4dca8f517c565555'}}
  );

  const json = await response.json();
  setBible(json.passages);
  console.log(json);
  // console.log("test");

  }

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) : void=>{
    const chapter = event.target.value;
    setBook(event.target.value);
    console.log(event.target.value);
    getBible(chapter);
  }

  const onChangeVerse = (event: React.ChangeEvent<HTMLSelectElement>) : void=>{
    const chapter = event.target.value;
    setBook(event.target.value);
    console.log(event.target.value);
    getBible(chapter);

  }

  useEffect(()=>{getBible()},[]);
  return (
    <div className="container container__bible">
      <h1 className="box-decoration-slice">My Bible</h1>
      <select onChange={onChange}>
        <option value="Genesis">Genesis</option>
        <option value="John">John</option>
        <option value="Ruth">Ruth</option>
      </select>
      <br/>
      <select onChange={onChangeVerse}>
        <option value="Genesis">Genesis</option>
        <option value="John">John</option>
        <option value="Ruth">Ruth</option>
      </select>

      <div className="container mx-auto">
        {bible? bible.toString().split('[').map((content,index) => 
        <div className="hover:bg-white">
        <span key={index}>{index}</span>
        <p key={index} className="verse">{content} </p>
        </div>) : "Loading"}
      </div>
      
      <Keep book={book} chapter={chapter} verse={verse}/>
    </div>
  );
}

export default App;
