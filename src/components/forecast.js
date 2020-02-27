import React from "react"; 
import {connect} from 'react-redux';
import {forecastHeaders} from '../utils/arrays';

const _forecast = (props)=>{

const {forecast} = props;

const tableRow =(data)=>{return(<tr key={data}>{data.map((item)=>{return(<td key={item}>{item}</td>)})}</tr>)}

return(
  forecast.length?
  <React.Fragment>
     <h1>Prognoza 3-dniowa</h1>
    <table className ='forecastTable'><thead><tr>{forecastHeaders.map(item => <th key={item}>{item}</th>)}</tr></thead>
    <tbody>{forecast.map(item => tableRow(item))}</tbody></table>
  </React.Fragment>:null

)


}



const mapStateToProps = (state) => (
    {
     forecast: state.Forecast,
    }
)
  
  
  const Forecast = connect(mapStateToProps)(_forecast);
  
  export default Forecast;
  
  