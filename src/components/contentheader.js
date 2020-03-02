import React from "react";  
import { connect } from 'react-redux';
import {ContentHeaderWrapper, ContentHeaderCity } from'../utils/details';

const _contentPageHeader =(props)=> {

    const { city} = props;
    return (city?
    <ContentHeaderWrapper>
        <ContentHeaderCity> 
            {city}
        </ContentHeaderCity>
    </ContentHeaderWrapper>:null
    ) 
}

const mapStateToProps = (state) => ({
    city: state.currentCity,
  })
const ContentPageHeader = connect(mapStateToProps)(_contentPageHeader);

export default ContentPageHeader;
   