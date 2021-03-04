import * as React from 'react';

const NotValidated = (props)=>{

    const{isValidated, message}= props;
    return (
        !isValidated && message?<article className ='not-validated'><p>{"Nie zwalidowano. "+ message}</p></article>:null
    )
}

export default NotValidated;