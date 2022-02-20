import React, { SelectHTMLAttributes, useEffect, useState } from 'react';
import './App.css';
import Keep from './Keep';

function App() {
  const [bible, setBible] = React.useState("");
  const [book, setBook] = React.useState("");
  const [bookList, setBookList] = React.useState([]);
  const [chapter, setChapter] = React.useState("");
  const [verse, setVerse] = React.useState("");
  const [loading, setLoading] = React.useState(false);


  async function getBible(chapter :string = 'Genesis'){

    const response = await fetch(`https://api.esv.org/v3/passage/text/?q=${chapter}&include-passage-references=false&include-verse-numbers=true&include-headings=false&include-passage-horizontal-lines=true&include-first-verse-numbers=true&include-footnotes=false&include-heading-horizontal-lines=true`,
      {method: 'GET', headers:{'Authorization': 'Token d59a5361e2ab87063ed857904f5f6ce3d1869392'}}
    );

    const json = await response.json();
    setBible(json.passages);
    //console.log(json);

  }

  async function getBook(){
    const response = await fetch(`https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/books`,
    {method: 'GET', headers:{'api-key': 'a4a596acd24972af4dca8f517c565555'}}
  );

  const json = await response.json();
  setBookList(json.data);
  setLoading(true);
  
  

  }

  const onChangeGetBookList = (event: React.ChangeEvent<HTMLSelectElement>) => {
    getBook();
    const name = event.target.value;
    setBook(name);
    getBible(name);
    console.log(name);
    
  }

  useEffect(()=>{getBook(); getBible();},[]);
  
  return (
    <div className="container container__bible">
      <h1 className="box-decoration-slice">My Bible</h1>
  
      <select onChange={onChangeGetBookList} >
        { loading? bookList.map(({name}: any)=><option>{name}</option>) : "loading"}
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
