import React, { SelectHTMLAttributes, useEffect, useState } from 'react';
import './App.css';
import Keep from './Keep';

function App() {
  const [bibleVerse, setBibleVerse] = React.useState("");
  const [bibleBookList, setBibleBookList] = React.useState([]);
  const [bookId, setBookId] = React.useState('GEN');
  const [bookName, setBookName] = React.useState('Genesis');
  
  const [chapter, setChapter] = React.useState('');
  const [chapterList, setChapterList] = React.useState([]);
  const [verse, setVerse] = React.useState("");
  const [loading, setLoading] = React.useState(false);


  async function getBibleVerse(book = 'Genesis', chapter ='1'){

    const response = await fetch(`https://api.esv.org/v3/passage/text/?q=${book}+${chapter}&include-passage-references=false&include-verse-numbers=true&include-headings=false&include-passage-horizontal-lines=true&include-first-verse-numbers=true&include-footnotes=false&include-heading-horizontal-lines=true`,
      {method: 'GET', headers:{'Authorization': 'Token d59a5361e2ab87063ed857904f5f6ce3d1869392'}}
    );

    const json = await response.json();
    setBibleVerse(json.passages);
    //console.log(response);
  }

  async function getBibleBookList(){
    const response = await fetch(`https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/books`,
    {method: 'GET', headers:{'api-key': 'a4a596acd24972af4dca8f517c565555'}}
  );

  const json = await response.json();
  setBibleBookList(json.data);
  //console.log(json.data);
  setLoading(true);
  }

  async function getBibleChapter(book: string = 'GEN'){
    const response = await fetch(`https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/books/${book}/chapters`,
    {method: 'GET', headers:{'api-key': 'a4a596acd24972af4dca8f517c565555'}}
  );

  const json = await response.json();
  setChapterList(json.data);
  //console.log(json.data);
  // setLoading(true);
  }

  const onChangeBibleBookList = (event: React.ChangeEvent<HTMLSelectElement>) => {

    let bookID = event.target.value;
    let bookName = event.target.options[event.target.selectedIndex].text;
    

    setBookId(bookID);
    console.log(bookName);
    setBookName(bookName);
    getBibleChapter(bookID);
    getBibleBookList();
    console.log("1번 셀렉트 book : " + bookID+ ": " + chapter + "   bookName : " +bookName);
    getBibleVerse(bookName, chapter);   
    //console.log("onChangeGetBookList");
  }

  const onChangeBibleChapterList = (event: React.ChangeEvent<HTMLSelectElement>)  => {

    
    const chapter = event.target.value;
    setChapter(chapter); 
    
    //console.log("book : " + bookName+ ": " + chapter);
    getBibleChapter(bookId);
    getBibleVerse(bookName, chapter);
    
  }

  useEffect(()=>{ getBibleBookList();getBibleChapter();getBibleVerse(); },[]);
  
  return (
    <div className="container container__bible">
      <h1 className="box-decoration-slice">My Bible</h1>
  
      <select onChange={onChangeBibleBookList} value={bookId}>
        { bibleBookList&&bibleBookList.map(({name, id}: any)=><option value={id}>{name}</option>)}
      </select>
      
      <br/>
      <select onChange={onChangeBibleChapterList} value={chapter}>
        { chapterList&&chapterList.map(({number}: any)=><option>{number}</option>)}
      </select>

      <div className="container mx-auto">
        {bibleVerse? bibleVerse.toString().split('[').map((content,index) => 
        <div className="hover:bg-white">
        <span key={index}>{index}</span>
        <p key={content} className="verse">{content} </p>
        </div>) : "Loading"}
      </div>
      
      <Keep book={bookName} chapter={chapter} verse={verse}/>
    </div>
  );
}

export default App;
