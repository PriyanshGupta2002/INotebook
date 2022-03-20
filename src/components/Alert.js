import React from 'react'

const Alert = (props) => {
    const {alert}=props
    return (
        <div>
            <div className={`alert alert-${alert.type}`} role="alert" style={{maxHeight:'50px'}}>
                <strong> {alert.message}</strong>
            </div>
        </div>
    )
}

export default Alert
