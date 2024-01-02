import React from 'react'

export const Todoitem = (props) => {
  return (
    <div style={{alignItems: 'center', justifyContent: 'space-between',display: 'flex', width: '40%', margin: 10, background: 'lightgrey', padding: 10}}>
        <div>
        <h3>{props.title}</h3>
        <h5 style={{marginTop: 10}}>{props.description}</h5>
        </div>
        
        <div style={{ gap:10, alignItems: 'center', display: 'flex'}}>
            <input onChange={() => props.update(props.id) } type="checkbox" name="completed" checked={props.isCompleted} />
            <button onClick={() => props.delete(props.id) } >Delete</button>
        </div>
    </div>
  )
}
