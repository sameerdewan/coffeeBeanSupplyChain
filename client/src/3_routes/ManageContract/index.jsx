import React, { useEffect, useState } from 'react';
import {Container, Row, Col, FormControl, Alert, Button, Spinner, InputGroup} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {withContext} from '../../1_context';
import './index.css';


function ManageContract(props) {
    const [contract, setContract] = useState(null);
    const [usingSaved, setUsingSaved] = useState(false);

    const [workingContract, setWorkingContract] = useState(null);
    const [role, setRole] = useState(null);
    const [error, setError] = useState(false);

    // OWNER
    ///////////////////////////////////
    // Farmer Address
    const [farmerAddress, setFarmerAddress] = useState(null);
    // Distributor Address
    const [distributorAddress, setDistributorAddress] = useState(null);
    // Retailer Address
    const [retailerAddress, setRetailerAddress] = useState(null);

    // FARMER
    ///////////////////////////////////
    // Harvest
    const [productUPC, setProductUPC] = useState(null);
    const [farmName, setFarmName] = useState(null);
    const [farmInformation, setFarmInformation] = useState(null);
    const [farmLatitude, setFarmLatitude] = useState(null);
    const [farmLongitude, setFarmLongitude] = useState(null);
    const [productName, setProductName] = useState(null);
    // Process
    const [processUPC, setProcessUPC] = useState(null);
    // Pack
    const [packUPC, setPackUPC] = useState(null);
    // Add to Palette
    const [addToPaletteUPC, setAddToPaletteUPC] = useState(null);
    const [productPrice, setProductPrice] = useState(null);

    // DISTRIBUTOR
    ///////////////////////////////////
   // Buy Palette
   const [buyPaletteUPC, setBuyPaletteUPC] = useState(null);
   // Ship Palette
   const [shipPaletteUPC, setShipPaletteUPC] = useState(null); 

    // RETAILER
    ///////////////////////////////////
    // Receive Palette
    const [receivePaletteUPC, setReceivePaletteUPC] = useState(null);
    // Initialize Sale
    const [initializeSaleUPC, setInitializeSaleUPC] = useState(null);
    const [initializeSaleConsumerID, setInitializeSaleConsumerID] = useState(null);

    // CONSUMER
    ///////////////////////////////////
    // Buy Product
    const [buyProductUPC, setBuyProductUPC] = useState(null);

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
                setWorkingContract(meta);
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
                                                    setFarmerAddress(e.target.value);
                                                }}
                                                />
                                                <InputGroup.Append>
                                                <Button variant={'success'} onClick={() => {
                                                   workingContract.methods.addFarmer(farmerAddress).send({from: props.account})
                                                   .on('transactionHash', function(hash){
                                                       console.log({hash})
                                                   })
                                                   .on('receipt', function(receipt){
                                                       console.log({receipt})
                                                   })
                                                   .on('confirmation', function(confirmationNumber, receipt){
                                                       console.log({confirmationNumber});
                                                   })
                                                   .on('error', (error) => {
                                                       setError(true);
                                                       console.log({error});
                                                   });
                                                }}><i className="fas fa-plus"></i> Add Farmer</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <br/>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                placeholder="Distributor Address"
                                                onChange={e => {
                                                    setDistributorAddress(e.target.value);
                                                }}
                                                />
                                                <InputGroup.Append>
                                                <Button variant={'success'} onClick={() => {
                                                    workingContract.methods.addDistributor(distributorAddress).send({from: props.account})
                                                    .on('transactionHash', function(hash){
                                                        console.log({hash})
                                                    })
                                                    .on('receipt', function(receipt){
                                                        console.log({receipt})
                                                    })
                                                    .on('confirmation', function(confirmationNumber, receipt){
                                                        console.log({confirmationNumber});
                                                    })
                                                    .on('error', (error) => {
                                                        setError(true);
                                                        console.log({error});
                                                    });
                                                }}><i className="fas fa-plus"></i> Add Distributor</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <br/>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                placeholder="Retailer Address"
                                                onChange={e => {
                                                    setRetailerAddress(e.target.value);
                                                }}
                                                />
                                                <InputGroup.Append>
                                                <Button variant={'success'} onClick={() => {
                                                    workingContract.methods.addRetailer(retailerAddress).send({from: props.account})
                                                    .on('transactionHash', function(hash){
                                                        console.log({hash})
                                                    })
                                                    .on('receipt', function(receipt){
                                                        console.log({receipt})
                                                    })
                                                    .on('confirmation', function(confirmationNumber, receipt){
                                                        console.log({confirmationNumber});
                                                    })
                                                    .on('error', (error) => {
                                                        setError(true);
                                                        console.log({error});
                                                    });
                                                }}><i className="fas fa-plus"></i> Add Retailer</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <br/>
                                            <center>
                                                <Button variant={'danger'} onClick={() => {
                                                    workingContract.methods.kill().send({from: props.account})
                                                    .on('transactionHash', function(hash){
                                                        console.log({hash})
                                                    })
                                                    .on('receipt', function(receipt){
                                                        console.log({receipt})
                                                    })
                                                    .on('confirmation', function(confirmationNumber, receipt){
                                                        console.log({confirmationNumber});
                                                    })
                                                    .on('error', (error) => {
                                                        setError(true);
                                                        console.log({error});
                                                    });
                                                }}>
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
                                                <FormControl placeholder={'Product UPC'} onChange={e => setProductUPC(e.target.value)}/>
                                                <FormControl placeholder={'Farm Name'} onChange={e => setFarmName(e.target.value)}/>
                                                <FormControl placeholder={'Farm Information'} onChange={e => setFarmInformation(e.target.value)}/>
                                                <FormControl placeholder={'Farm Latitude'} onChange={e => setFarmLatitude(e.target.value)}/>
                                                <FormControl placeholder={'Farm Longitude'} onChange={e => setFarmLongitude(e.target.value)}/>
                                                <FormControl placeholder={'Product Name'} onChange={e => setProductName(e.target.value)}/>
                                                <Button
                                                    onClick={() => {
                                                        workingContract.methods.harvest(
                                                            productUPC,
                                                            props.account,
                                                            farmName,
                                                            farmInformation,
                                                            farmLatitude,
                                                            farmLongitude,
                                                            productName
                                                        ).send({from: props.account})
                                                        .on('transactionHash', function(hash){
                                                            console.log({hash})
                                                        })
                                                        .on('receipt', function(receipt){
                                                            console.log({receipt})
                                                        })
                                                        .on('confirmation', function(confirmationNumber, receipt){
                                                            console.log({confirmationNumber});
                                                        })
                                                        .on('error', (error) => {
                                                            setError(true);
                                                            console.log({error});
                                                        });
                                                    }}
                                                ><i className="fas fa-seedling"></i> Harvest</Button>
                                                <br/><br/>
                                                <InputGroup className="mb-3">
                                                    <FormControl
                                                    placeholder="UPC"
                                                    onChange={e => {
                                                        setProcessUPC(e.target.value);
                                                    }}
                                                    />
                                                    <InputGroup.Append>
                                                    <Button onClick={() => {
                                                        workingContract.methods.process(processUPC).send({from: props.account})
                                                        .on('transactionHash', function(hash){
                                                            console.log({hash})
                                                        })
                                                        .on('receipt', function(receipt){
                                                            console.log({receipt})
                                                        })
                                                        .on('confirmation', function(confirmationNumber, receipt){
                                                            console.log({confirmationNumber});
                                                        })
                                                        .on('error', (error) => {
                                                            setError(true);
                                                            console.log({error});
                                                        });
                                                    }}><i className="fas fa-cogs"></i> Process</Button>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                                <br/>
                                                <InputGroup className="mb-3">
                                                    <FormControl
                                                    placeholder="UPC"
                                                    onChange={e => {
                                                        setPackUPC(e.target.value);
                                                    }}
                                                    />
                                                    <InputGroup.Append>
                                                    <Button onClick={() => {
                                                        workingContract.methods.pack(packUPC).send({from: props.account})
                                                        .on('transactionHash', function(hash){
                                                            console.log({hash})
                                                        })
                                                        .on('receipt', function(receipt){
                                                            console.log({receipt})
                                                        })
                                                        .on('confirmation', function(confirmationNumber, receipt){
                                                            console.log({confirmationNumber});
                                                        })
                                                        .on('error', (error) => {
                                                            setError(true);
                                                            console.log({error});
                                                        });
                                                    }}><i className="fas fa-box-open"></i> Pack</Button>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                                <br/>
                                                <InputGroup className="mb-3">
                                                    <FormControl
                                                    placeholder="UPC"
                                                    onChange={e => {
                                                        setAddToPaletteUPC(e.target.value);
                                                    }}
                                                    />
                                                    <FormControl
                                                    placeholder="Product Price"
                                                    onChange={e => {
                                                        setProductPrice(Number(e.target.value));
                                                    }}
                                                    />
                                                    <InputGroup.Append>
                                                    <Button onClick={() => {
                                                        workingContract.methods.addToPalette(addToPaletteUPC, productPrice).send({from: props.account})
                                                        .on('transactionHash', function(hash){
                                                            console.log({hash})
                                                        })
                                                        .on('receipt', function(receipt){
                                                            console.log({receipt})
                                                        })
                                                        .on('confirmation', function(confirmationNumber, receipt){
                                                            console.log({confirmationNumber});
                                                        })
                                                        .on('error', (error) => {
                                                            setError(true);
                                                            console.log({error});
                                                        });
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
                                                        setBuyPaletteUPC(e.target.value);
                                                    }}
                                                    />
                                                    <InputGroup.Append>
                                                    <Button onClick={() => {
                                                        workingContract.methods.buyPalette(buyPaletteUPC).send({from: props.account, value: props.web3.utils.fromWei(`${productPrice}`)})
                                                        .on('transactionHash', function(hash){
                                                            console.log({hash})
                                                        })
                                                        .on('receipt', function(receipt){
                                                            console.log({receipt})
                                                        })
                                                        .on('confirmation', function(confirmationNumber, receipt){
                                                            console.log({confirmationNumber});
                                                        })
                                                        .on('error', (error) => {
                                                            setError(true);
                                                            console.log({error});
                                                        });
                                                    }}><i className="fas fa-truck-loading"></i> Buy Palette</Button>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                                <br/>
                                                <InputGroup className="mb-3">
                                                    <FormControl
                                                    placeholder="UPC"
                                                    onChange={e => {
                                                        setShipPaletteUPC(e.target.value);
                                                    }}
                                                    />
                                                    <InputGroup.Append>
                                                    <Button onClick={() => {
                                                        workingContract.methods.shipPalette(shipPaletteUPC).send({from: props.account})
                                                        .on('transactionHash', function(hash){
                                                            console.log({hash})
                                                        })
                                                        .on('receipt', function(receipt){
                                                            console.log({receipt})
                                                        })
                                                        .on('confirmation', function(confirmationNumber, receipt){
                                                            console.log({confirmationNumber});
                                                        })
                                                        .on('error', (error) => {
                                                            setError(true);
                                                            console.log({error});
                                                        });
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
                                                    setReceivePaletteUPC(e.target.value);
                                                }}
                                                />
                                                <InputGroup.Append>
                                                <Button onClick={() => {
                                                    workingContract.methods.receivePalette(receivePaletteUPC).send({from: props.account})
                                                    .on('transactionHash', function(hash){
                                                        console.log({hash})
                                                    })
                                                    .on('receipt', function(receipt){
                                                        console.log({receipt})
                                                    })
                                                    .on('confirmation', function(confirmationNumber, receipt){
                                                        console.log({confirmationNumber});
                                                    })
                                                    .on('error', (error) => {
                                                        setError(true);
                                                        console.log({error});
                                                    });
                                                }}><i className="fas fa-boxes"></i> Receive Palette</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <br/>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                placeholder="UPC"
                                                onChange={e => {
                                                    setInitializeSaleUPC(e.target.value);
                                                }}
                                                />
                                                <FormControl
                                                placeholder="Consumer ID"
                                                onChange={e => {
                                                    setInitializeSaleConsumerID(e.target.value);
                                                }}
                                                />
                                                <InputGroup.Append>
                                                <Button onClick={() => {
                                                    workingContract.methods.initializeSale(initializeSaleUPC, initializeSaleConsumerID).send({from: props.account})
                                                    .on('transactionHash', function(hash){
                                                        console.log({hash})
                                                    })
                                                    .on('receipt', function(receipt){
                                                        console.log({receipt})
                                                    })
                                                    .on('confirmation', function(confirmationNumber, receipt){
                                                        console.log({confirmationNumber});
                                                    })
                                                    .on('error', (error) => {
                                                        setError(true);
                                                        console.log({error});
                                                    });
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
                                                    setBuyProductUPC(e.target.value);
                                                }}
                                                />
                                                <InputGroup.Append>
                                                <Button onClick={() => {
                                                    workingContract.methods.buy(buyProductUPC).send({from: props.account})
                                                    .on('transactionHash', function(hash){
                                                        console.log({hash})
                                                    })
                                                    .on('receipt', function(receipt){
                                                        console.log({receipt})
                                                    })
                                                    .on('confirmation', function(confirmationNumber, receipt){
                                                        console.log({confirmationNumber});
                                                    })
                                                    .on('error', (error) => {
                                                        setError(true);
                                                        console.log({error});
                                                    });
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