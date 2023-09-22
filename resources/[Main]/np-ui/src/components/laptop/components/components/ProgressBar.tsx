import React from 'react'

export const ProgressBar = (props) => {
    const { completed } = props;


    const fillerStyles = {
        width: `${completed}%`,
    }

    return (
        <>
            <div className='proggresBoosting'>
                <div style={fillerStyles} className='proggresBoosting2'>
                </div>
            </div>
        </>
    )
}
