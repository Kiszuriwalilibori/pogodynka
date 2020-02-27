import React from "react";  
import { connect } from 'react-redux';
import {compareWeather} from '../utils/functions';
import {citiesArray, groupTableHeaders} from '../utils/arrays'

const _group = (props)=>{

    const{weather, group, city} = props;
    const header = 'Porównanie pogody w miejscowości ' + city +' i innych miejscowościach';

    var createCell= (item)=>{return (typeof(item)== 'string')? <td key={item}>{item}</td>:<td><p>{item.value}</p><p>{item.comment}</p></td> }

    var createRow =(data)=>{return(<tr key={data}>{data.map((item)=>{return(createCell(item))})}</tr>)}


    if (group && weather){
     
        const Weather = weather.main;
        const group_main_array = [];
        let Group = group.forEach((item)=>{group_main_array.push(item.main)});
        Group = group_main_array;
        var ComparativeTable = Group.map((item)=>{return compareWeather(Weather, item, Object.keys(Weather) );})
        ComparativeTable.forEach((item, index)=>{item.unshift(citiesArray[index][0])});//addas city names to the array from static table, if taken from API response would be without polish characters
        console.log(ComparativeTable);
        
    }  
 
    return(
        (city && group && weather)?
        <React.Fragment>
        <h1>{header}</h1>
        <table className ='forecastTable'><thead><tr><th>Miasto</th>{groupTableHeaders.map(item => <th key={item}>{item}</th>)}</tr></thead>
        <tbody>{ComparativeTable.map(item => createRow(item))}</tbody></table>
        </React.Fragment>:null

    )
}

const mapStateToProps = (state) => (
    {
        weather: state.currentCityData,
        group: state.Group,
        city: state.currentCity,
    }
)


const Group = connect(mapStateToProps)(_group);

export default Group;

