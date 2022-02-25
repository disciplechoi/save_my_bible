import React, { SelectHTMLAttributes, useEffect, useState } from 'react';
import './App.css';
import Keep from './Keep';

function App() {
  const [bibleVerse, setBibleVerse] = React.useState("");
  const [bibleBookList, setBibleBookList] = React.useState([]);
  const [bookId, setBookId] = React.useState('GEN');
  const [bookName, setBookName] = React.useState('Genesis');
  
  const [chapter, setChapter] = React.useState('1');
  const [chapterList, setChapterList] = React.useState([]);
  const [verse, setVerse] = React.useState('1');
  const [loading, setLoading] = React.useState(false);

  //when click what you wante dto save
  const [savedVerse, setSavedVerse] = useState("");
  const [savedVerseList, setSavedVerseList] = useState<string[]>([]);


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

  const saveBibleVerse =(event: React.MouseEvent<HTMLElement>) :void=>{
    let savedBibleVerse = event.target as HTMLElement;
    let savedBibleVerseInnerText =  savedBibleVerse.innerText
    console.log(savedBibleVerse.innerText);
    setSavedVerse(savedBibleVerseInnerText);
    setSavedVerseList((currentArray) =>[savedVerse,...currentArray]);

  }

  useEffect(()=>{ getBibleBookList();getBibleChapter();getBibleVerse(); },[]);
  
  return (
    <div >
      {/* <h1 className="box-decoration-slice">My Bible</h1> */}

      <div className="mx-auto" id="container">
          
          <input id="tab-1" type="radio" name="tab-group" checked />
            <label className="lal__content1" htmlFor="tab-1" >Description</label>

            <input  id="tab-2" type="radio" name="tab-group" />
	          <label htmlFor="tab-2" className="lal__content2">Tab 2</label>
            
             <div id="content">
                  <div id="content-1" className="border-solid border-2 border-white-600">                 
                    <select onChange={onChangeBibleBookList} value={bookId}>
                      { bibleBookList&&bibleBookList.map(({name, id}: any)=><option value={id}>{name}</option>)}
                    </select>
                    
                    <br/>
                    <select onChange={onChangeBibleChapterList} value={chapter}>
                      { chapterList&&chapterList.map(({number}: any)=><option>{number}</option>)}
                    </select>

                    <div className="content-1__bibleVerse">
                      {bibleVerse? bibleVerse.toString().split('[').map((content,index) => 
                        <p key={chapter+index} className="verse" onClick={saveBibleVerse}>{content} </p>) : "Loading"}
                    </div>
                 
                </div>

                <div id="content-2" className="border-solid border-2 border-white-600 scroll-smooth">
                   <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla?</p>
                </div>      
             </div>
          
            
      </div>
  
      
      {/* <div className="container--right">
        <h1>here</h1>
      {savedVerseList.map(text=><p>{text}</p>)}
      </div> */}
    </div>
  );
}

export default App;
