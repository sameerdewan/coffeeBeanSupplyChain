import React from 'react';
import {Route} from 'react-router-dom';
import {Container, Row, Col, FormControl, Alert} from 'react-bootstrap';
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
                                Base Supply Chain ABI Code
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
                                    Deploy a Supply Chain Contract
                                </code>
                            </center>
                        </section>
                        <section className={'initialize-contract-container'}>
                            <br/>
                            <Alert variant={'primary'}>
                                <Alert.Heading>Deploying a Contract</Alert.Heading>
                                <p>
                                    To deploy a supply chain contract, <u>you will need to access this page
                                    from the address intended to be the owner of this particular instance
                                    of the supply chain contract</u>. The owner cannot be a farmer, distributor,
                                    or retailer. 
                                    <br/><br/>
                                    The owner of this contract will be able to add farmers, distributors, and retailers
                                    to the deployed smart contract instance, whom in turn may participate in the supply chain.
                                </p>
                                <hr />
                                <p className="mb-0">
                                    <i>
                                        You must have access to the addresses provided for the farmer, distributor, and retailer
                                        to interact with the contract's role based actions.
                                    </i>
                                </p>
                            </Alert>
                            <br/>
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