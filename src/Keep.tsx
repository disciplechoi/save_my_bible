import { useEffect, useState } from 'react';


type KeepProps ={
    book: string
    chapter: string
    verse: string
}

const defaultProps = {
    book: "Genesis",
    chapter: "1",
    verse: "1"
  };

 

function Keep({book, chapter, verse} :KeepProps = defaultProps){
    const [savedVerse, setSavedVerse] = useState("");
    const [savedVerseList, setSavedVerseList] = useState<string[]>([]);

    console.log("chapter: " +chapter+" verse : "+verse);
    async function getBibleVerse(){

       
        const response = await fetch(`https://api.esv.org/v3/passage/text/?q=${book}+${chapter}:${verse}&include-passage-references=false&include-verse-numbers=true&include-headings=false&include-passage-horizontal-lines=true&include-first-verse-numbers=true&include-footnotes=false&include-heading-horizontal-lines=true`,
          {method: 'GET', headers:{'Authorization': 'Token d59a5361e2ab87063ed857904f5f6ce3d1869392'}}
        );
    
        const json = await response.json();
        setSavedVerse(json.passages);
        setSavedVerseList((currentArray) =>[savedVerse,...currentArray]);
        console.log(savedVerseList);
        
      }
    
      useEffect(()=>{getBibleVerse()},[]);

      
    return(
    <div className="container container__keep">
        <h1>Here are what you saved</h1>
        {savedVerseList.map(text=><p>{text}</p>)}
    
    </div>);
}


export default Keep;