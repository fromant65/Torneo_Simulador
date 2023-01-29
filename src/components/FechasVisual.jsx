import React from 'react'
import "../css/fixture.css";

const FechasVisual = ({fechasVisual}) => {
  return (
    <div className='fixture'>
        {fechasVisual.map(fecha=>{
          return <li key={`${fechasVisual.indexOf(fecha)+1}`}>Fecha {fechasVisual.indexOf(fecha)+1} {fecha.map(partido=>{
            return  <div key={fecha.indexOf(partido)}>{partido[0]} vs {partido[1]}</div>
          })}</li>
          
        })}
    </div>
  )
}

export default FechasVisual