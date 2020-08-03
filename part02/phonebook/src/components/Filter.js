import React from 'react'

const Filter = (props) => {

    return (
        <div>
            filter as shown with: 
            <input 
                value={props.newFilter} 
                onChange={props.handleOnChangeFilter} 
            />
        </div>
    )
}

export default Filter