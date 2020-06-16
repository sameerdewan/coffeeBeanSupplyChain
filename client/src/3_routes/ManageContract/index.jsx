import React, { useEffect, useState } from 'react';
import {Container, Row, Col, FormControl, FormLabel, Alert, Button, Spinner, InputGroup} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {withContext} from '../../1_context';
import './index.css';


function ManageContract(props) {
    const [contract, setContract] = useState(null);
    const [usingSaved, setUsingSaved] = useState(false);

    const [workingContract, setWorkingContract] = useState(null);
    const [role, setRole] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const stored_contract = window.localStorage.getItem('contract');
        if (stored_contract !== null) setContract(JSON.parse(stored_contract));
    }, [props.state.deployedContract]);

    useEffect(() => {
        if (usingSaved === true) {
            const meta = new props.web3.eth.Contract(contract.abi, contract.address);
            const role = meta.methods.getUserRole().call({from: props.account});
            Promise.resolve(role).then(role => {
                setRole(role);
                setWorkingContract(contract);
            }).catch(error => {
                setError(true);
                console.log({error})
            });
        }
    });

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
                            (contract !== null && usingSaved !== true && error !== true) ? 
                            <Alert variant={'success'}>
                                <Alert.Heading><i className="fas fa-box-open"></i> Contract Found</Alert.Heading>
                                It appears you have a stored contract in local storage. Would you like to use it?
                                <br/><br/>
                                <Alert.Link href='#'
                                    onClick={() => setUsingSaved(true)}
                                >
                                    <i className="fas fa-file-signature"></i> Use Stored Contract
                                </Alert.Link>
                                <br/><br/>
                                <Alert.Link
                                    onClick={() => {
                                        window.localStorage.removeItem('contract');
                                        setContract(null);
                                    }}
                                >
                                    <i className="fas fa-trash-alt"></i> Clear Stored Contract
                                </Alert.Link>
                            </Alert> : ''
                        }
                        {
                            error === true && 
                            <Alert variant={'danger'}>
                                <Alert.Heading><i className="fas fa-exclamation-circle"></i> Error</Alert.Heading>
                                Error encountered. Check console for details.
                            </Alert>
                        }
                        {
                            ((contract !== null && usingSaved !== true) || contract === null) && error === false  ? 
                            <React.Fragment>
                                <FormLabel>Contract ABI</FormLabel>
                                <FormControl as={'textarea'}/>
                                <FormLabel>Contract Address</FormLabel>
                                <FormControl />
                                <br/>
                                <Button><i className="fas fa-file-signature"></i> Manage Contract</Button>
                            </React.Fragment> : ''
                        }
                        {
                            contract !== null && usingSaved === true && role !== null && workingContract !== null ? 
                            <React.Fragment>
                                {
                                    role === 'owner' ? 
                                    <React.Fragment>
                                        <Alert>
                                            <center>
                                                <Alert.Heading><i className="fas fa-crown"></i> Owner</Alert.Heading>
                                            </center>
                                            <br/>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                placeholder="Farmer Address"
                                                onChange={e => {
                                                }}
                                                />
                                                <InputGroup.Append>
                                                <Button variant={'success'} onClick={() => {
                                                   
                                                }}><i className="fas fa-plus"></i> Add Farmer</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <br/>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                placeholder="Distributor Address"
                                                onChange={e => {
                                                }}
                                                />
                                                <InputGroup.Append>
                                                <Button variant={'success'} onClick={() => {
                                                   
                                                }}><i className="fas fa-plus"></i> Add Distributor</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <br/>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                placeholder="Retailer Address"
                                                onChange={e => {
                                                }}
                                                />
                                                <InputGroup.Append>
                                                <Button variant={'success'} onClick={() => {
                                                   
                                                }}><i className="fas fa-plus"></i> Add Retailer</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <br/>
                                            <center>
                                                <Button variant={'danger'}>
                                                    <i className="fas fa-skull-crossbones"></i> Kill Contract
                                                </Button>
                                            </center>
                                            <br/>
                                        </Alert>
                                    </React.Fragment> : role === 'farmer' ? 
                                    <React.Fragment>
                                        <Alert>
                                            <center>
                                                <Alert.Heading><i className="fas fa-tractor"></i> Farmer</Alert.Heading>
                                                <br/><br/>
                                                <FormControl placeholder={'Farm Name'}/>
                                                <FormControl placeholder={'Farm Information'}/>
                                                <FormControl placeholder={'Farm Latitude'}/>
                                                <FormControl placeholder={'Farm Longitude'}/>
                                                <FormControl placeholder={'Product Name'}/>
                                                <Button><i className="fas fa-seedling"></i> Harvest</Button>
                                                <br/><br/>
                                                <InputGroup className="mb-3">
                                                    <FormControl
                                                    placeholder="UPC"
                                                    onChange={e => {
                                                    }}
                                                    />
                                                    <InputGroup.Append>
                                                    <Button onClick={() => {
                                                    
                                                    }}><i className="fas fa-cogs"></i> Process</Button>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                                <br/>
                                                <InputGroup className="mb-3">
                                                    <FormControl
                                                    placeholder="UPC"
                                                    onChange={e => {
                                                    }}
                                                    />
                                                    <InputGroup.Append>
                                                    <Button onClick={() => {
                                                    
                                                    }}><i className="fas fa-box-open"></i> Pack</Button>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                                <br/>
                                                <InputGroup className="mb-3">
                                                    <FormControl
                                                    placeholder="UPC"
                                                    onChange={e => {
                                                    }}
                                                    />
                                                    <InputGroup.Append>
                                                    <Button onClick={() => {
                                                    
                                                    }}><i className="fas fa-pallet"></i> Add to Palette</Button>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </center>
                                        </Alert>
                                    </React.Fragment>
                                    : role === 'distributor' ? 
                                    <React.Fragment>
                                        <Alert>
                                            <center>
                                                <Alert.Heading><i className="fas fa-industry"></i> Distributor</Alert.Heading>
                                                <br/><br/>
                                                <InputGroup className="mb-3">
                                                    <FormControl
                                                    placeholder="UPC"
                                                    onChange={e => {
                                                    }}
                                                    />
                                                    <InputGroup.Append>
                                                    <Button onClick={() => {
                                                    
                                                    }}><i className="fas fa-truck-loading"></i> Buy Palette</Button>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                                <br/>
                                                <InputGroup className="mb-3">
                                                    <FormControl
                                                    placeholder="UPC"
                                                    onChange={e => {
                                                    }}
                                                    />
                                                    <InputGroup.Append>
                                                    <Button onClick={() => {
                                                    
                                                    }}><i className="fas fa-truck"></i> Ship Palette</Button>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </center>
                                        </Alert>
                                    </React.Fragment>
                                    : role === 'retailer' ? 
                                    <React.Fragment>
                                        <Alert>
                                            <center>
                                                <Alert.Heading><i className="fas fa-store"></i> Retailer</Alert.Heading>
                                            </center>
                                            <br/><br/>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                placeholder="UPC"
                                                onChange={e => {
                                                }}
                                                />
                                                <InputGroup.Append>
                                                <Button onClick={() => {
                                                
                                                }}><i className="fas fa-boxes"></i> Receive Palette</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <br/>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                placeholder="UPC"
                                                onChange={e => {
                                                }}
                                                />
                                                <FormControl
                                                placeholder="Consumer ID"
                                                onChange={e => {
                                                }}
                                                />
                                                <InputGroup.Append>
                                                <Button onClick={() => {
                                                
                                                }}><i className="fas fa-cash-register"></i> Initialize Sale</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Alert>
                                    </React.Fragment>
                                    : role === 'consumer' ? 
                                    <React.Fragment>
                                        <Alert>
                                            <center>
                                                <Alert.Heading><i className="fas fa-user"></i> Consumer</Alert.Heading>
                                            </center>
                                            <br/><br/>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                placeholder="UPC"
                                                onChange={e => {
                                                }}
                                                />
                                                <InputGroup.Append>
                                                <Button onClick={() => {
                                                
                                                }}><i className="fas fa-hand-holding-usd"></i> Buy Product</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Alert>
                                    </React.Fragment>
                                    :''
                                }
                                <Alert>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                        placeholder="UPC"
                                        onChange={e => {
                                        }}
                                        />
                                        <InputGroup.Append>
                                        <Button variant={'primary'} onClick={() => {
                                            
                                        }}><i className="fas fa-undo"></i> Fetch Product</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <br/>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                        placeholder="UPC"
                                        onChange={e => {
                                        }}
                                        />
                                        <InputGroup.Append>
                                        <Button variant={'primary'} onClick={() => {
                                            
                                        }}><i className="fas fa-history"></i> Fetch Product History</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Alert>
                            </React.Fragment> : usingSaved === true && role === null && workingContract === null ? 
                            <center><Spinner animation="border" variant="primary" /></center> : ''
                        }
                    </section>
                </Col>
            </Row>
        </Container>
    )
}

export default withRouter(withContext(ManageContract));