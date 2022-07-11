import React from "react";
import PropTypes from "prop-types";
import {utils} from "near-api-js";
import {Badge, Button, Card, Col, Stack} from "react-bootstrap";
import Cat from "./Cat";

const Product = ({cat, buy, clone}) => {
    console.log('clone from product', clone)
    const {id, price, name, cloned, clonePrice, sold, owner, dna} =
        cat;
    console.log('clonePrice from product', clonePrice)

    const triggerBuy = () => {
        buy(id, price);
    };
    const triggerClone = () => {
        clone(id, clonePrice);
    };

    return (
        <Col key={id}>
            <Card className=" h-100">
                <Card.Header>
                    <Stack direction="horizontal" gap={2}>
                        <span className="font-monospace text-secondary">{owner}</span>
                        <Badge bg="secondary" className="ms-auto">
                            Cloned {cloned}
                        </Badge>
                        <Badge bg="secondary" className="ms-auto">
                            {sold} Sold
                        </Badge>
                    </Stack>
                </Card.Header>
                <div className="catBox">
                    <Cat dna={dna}/>
                </div>
                <Card.Body className="d-flex  flex-column text-center">
                    <Card.Title>{name}</Card.Title>
                    <Card.Text className="flex-grow-1 ">{dna}</Card.Text>
                    {clonePrice && (<Button
                        variant="outline-dark"
                        onClick={triggerClone}
                        className="w-100 py-3 mb-2"
                    >
                        Clone for {utils.format.formatNearAmount(clonePrice)} NEAR
                    </Button>)}
                    <Button
                        variant="outline-dark"
                        onClick={triggerBuy}
                        className="w-100 py-3"
                    >
                        Buy for {utils.format.formatNearAmount(price)} NEAR
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

Product.propTypes = {
    cat: PropTypes.instanceOf(Object).isRequired,
    buy: PropTypes.func.isRequired,
};

export default Product;