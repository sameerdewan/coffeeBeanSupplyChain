import React, { useEffect, useState } from 'react';
import {Container, Row, Col, FormControl, Alert, Button, Spinner, InputGroup} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {withContext} from '../../1_context';
import './index.css';


function ManageContract(props) {
    const [contract, setContract] = useState(null);
    const [abi, setContractABI] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        const stored_contract = window.localStorage.getItem('contract');
        if (stored_contract !== null) setContract(JSON.parse(stored_contract));
    }, [props.state.deployedContract]);
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
                        {
                            contract !== null ? 
                            <Alert variant={'success'}>
                                <Alert.Heading><i className="fas fa-box-open"></i> Address Found</Alert.Heading>
                                It appears you have a saved address. Would you like to use it?
                                <br/><br/>
                                <Alert.Link href='#'
                                    onClick={() => props.history.push(`/manage/${contract.options.address}`)}
                                >
                                    <i className="fas fa-arrow-circle-right"></i> Use Stored Address
                                </Alert.Link>
                                <br/><br/>
                                <Alert.Link
                                    onClick={() => {
                                        window.localStorage.removeItem('contract');
                                        setContract(null);
                                    }}
                                >
                                    <i className="fas fa-trash-alt"></i> Clear Stored Address
                                </Alert.Link>
                            </Alert> : ''
                        }
                    </section>
                </Col>
            </Row>
        </Container>
    )
}

export default withRouter(withContext(ManageContract));