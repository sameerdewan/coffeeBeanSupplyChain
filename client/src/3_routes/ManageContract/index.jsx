import React, { useEffect, useState } from 'react';
import {Route} from 'react-router-dom';
import {Container, Row, Col, FormControl, Alert, Button, Spinner} from 'react-bootstrap';
import {withContext} from '../../1_context';
import './index.css';


function ManageContract(props) {
    const [storedAddress, setStoredAddress] = useState(null);
    useEffect(() => {
        const address = window.localStorage.getItem('address');
        if (address) setStoredAddress(address);
    }, []);
    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <section className={'manage-contract-label'}>
                        <center>
                            <code>Manage Contract</code>
                        </center>
                    </section>
                    <section className={'manage-contract-container'}>
                        <Alert variant={'success'}>
                            <Alert.Heading><i className="fas fa-box-open"></i> Address Found</Alert.Heading>
                            It appears you have a stored address in local storage. Would you like to use it?
                            <br/><br/>
                            <Alert.Link href='#'>
                                <i className="fas fa-arrow-circle-right"></i> Use Stored Address
                            </Alert.Link>
                            <br/><br/>
                            <Alert.Link>
                                <i className="fas fa-trash-alt"></i> Clear Stored Address
                            </Alert.Link>
                        </Alert>
                    </section>
                </Col>
            </Row>
        </Container>
    )
}

export default withContext(ManageContract);