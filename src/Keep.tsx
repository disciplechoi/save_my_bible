interface KeepProps{
    book: string;
    chapter: string;
    verse: string;
}

const defaultProps = {
    book: "",
    chapter: "",
    verse: ""
  };

function Keep({book, chapter,verse} :KeepProps){
    return(
    <div className="container container__keep">
        <h1>Here are what you saved</h1>

    
    </div>);
}


export default Keep;