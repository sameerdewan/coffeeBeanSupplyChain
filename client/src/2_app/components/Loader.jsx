import React from 'react';
import Spinner from 'react-bootstrap/Spinner';


function Loader() {
    return (
        <div className={'loader'}>
            <center>
                <Spinner animation="grow" variant="primary" size="lg" />
            </center>
            <center>
                <code>Awaiting Metamask approval...</code>
            </center>
        </div>
    )
}

export default Loader;