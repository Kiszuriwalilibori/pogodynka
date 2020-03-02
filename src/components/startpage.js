import React from "react"; 

  const StartPage =React.memo(()=> {

    return (
    <React.Fragment>
      <div className= 'start__body'>
        <h1>Witamy w pogodynce :)</h1>
        <div className ='start__text'>
        Niniejsza aplikacja ma jeszcze cokolwiek surowy wygląd (brak w niej chociażby ikon, planuję też dołączenie ogólnej informacji o stanie pogody w docelowej lokalizacji), jednak moim zdaniem spełnia przedstawione kryteria. zgodnie z złaożeniami, w wypadku błędu przenosi do strony 404 (od siebie dodałem opis rodzaju błędu).<br />
        </div>
      </div>
    </React.Fragment>
    )
    
    })

 export default StartPage;