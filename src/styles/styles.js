import styled, { createGlobalStyle } from 'styled-components';

export const styled_search = {
form: styled.form`
display:flex;
flex-direction:row;
justify-content:space-between;
align-items: center;
width: 500px;
border-radius: 0 0 20px 20px;
font-size:14px !important;
font-family:"Roboto", "Helvetica", "Arial", sans-serif !important; 
padding: 5px;`,
search: styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
background-color: #416467 `,
}

export const styled_nolocation ={

wrapper: styled.div`

`,
}


export const _location ={
cityHeader:styled.div`
padding-right: 13px;
font-size: 55px;
line-height: 55px;
font-family: Montserrat;
// background-color:#1B4778;
background-color:#416467
color:white;
text-transform: capitalize;
height:100px;
display:flex;
align-items:center;
justify-content:center;
`,
wrapper:styled.div`
max-width:1200px;
width:100%;
margin: 0 auto;
background-color: #416475;
`,
cityNameWrapper:styled.div`
max-width:1200px;
width:100%;
margin: 0 auto;
`,
weatherNow:styled.div``,
weatherNowContent:styled.div`
height:125px;
margin-top:30px;
width:100%;
color:white;
font-family: Montserrat;
display:flex;
justify-content:flex-start;
`,

}

























export const GlobalStyle = createGlobalStyle`

#root, body, html {
    height: 100vh;
    min-height: 100%;
    background-color: #416475;
    font-size: 14px;
    fonct-color: white;
}
}




* {box-sizing: border-box}

*{@import url('./styles/App.css');

}



html {

  font-size: 16px;
  
  @media 
    (max-width: 330px){ font-size:10px;}
  @media 
    (min-width: 331px)and (max-width: 568px) { font-size:12px;}
     
  @media 
    (min-width: 569px){ font-size:16px;}
  
 h1{
   color:white; 
   text-align:center; 
   margin:60px auto}

}
`;


