import React from 'react';
import {Route} from 'react-router-dom';
import {Container, Row, Col, FormControl} from 'react-bootstrap';
import {withContext} from '../../1_context';
import './index.css';


function InitializeContract(props) {
    return (
        <Route exact path={'/init'}>
            <Container>
                <Row>
                    <Col xs={4}>
                    <section className={'abi-label'}>
                        <center>
                            <code>
                                Supply Chain ABI Code
                            </code>
                        </center>
                    </section>
                    <section className={'abi-container'}>
                        <pre>
                            {JSON.stringify(props.abi, null, 2)}
                        </pre>
                    </section>
                    </Col>
                    <Col xs={8}>
                        <section className={'initialize-contract-label'}>
                            <center>
                                <code>
                                    Deploy an Instance of the Coffee Supply Chain Contract
                                </code>
                            </center>
                        </section>
                        <section className={'initialize-contract-container'}>
                            <br/><br/>
                            <FormControl placeholder={'Enter originFarmerID (initialFarmer)'}/>
                            <br/>
                            <FormControl placeholder={'Enter distributorID (initialDistributor)'}/>
                            <br/>
                            <FormControl placeholder={'Enter retailerID (initialRetailer)'}/>
                        </section>
                    </Col>
                </Row>
            </Container>
        </Route>
    )
}

export default withContext(InitializeContract);