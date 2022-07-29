import React, {useEffect, useState} from "react";
import {Badge, Button, Card, FloatingLabel, Form} from "react-bootstrap";
import {animations, defaultDNA} from "../../assets/js/utils/cat";
import Cat from "./Cat";
import {createCat, getCats} from "../../utils/marketplace";
import {toast} from "react-toastify";
import {NotificationError, NotificationSuccess} from "../utils/Notifications";
import Loader from "../utils/Loader";

const Generator = () => {
    const [name, setName] = useState(0);
    const [price, setPrice] = useState(0);
    const [clonePrice, setClonePrice] = useState(0);
    const [headcolor, setHeadcolor] = useState(0);
    const [mouthColor, setMouthColor] = useState(0);
    const [eyesColor, setEyesColor] = useState(0);
    const [earsColor, setEarsColor] = useState(0);
    const [decorationColor, setDecorationColor] = useState(0);
    const [animation, setAnimation] = useState(0);
    const [dna, setDNA] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setHeadcolor(defaultDNA["headcolor"])
        setMouthColor(defaultDNA["mouthColor"])
        setEyesColor(defaultDNA["eyesColor"])
        setEarsColor(defaultDNA["earsColor"])
        setDecorationColor(defaultDNA["decorationColor"])
        setAnimation(defaultDNA["animation"])
    }, []);
    useEffect(() => {
        setDNA(`${headcolor} ${mouthColor} ${eyesColor} ${earsColor} ${decorationColor} ${animation}`)
    }, [
        headcolor,
        mouthColor,
        eyesColor,
        earsColor,
        decorationColor,
        animation
    ]);

    const addCat = async (data) => {
        try {
            setLoading(true);
            if (data.price === data.clonePrice) throw new Error('Price and ')
            createCat(data).then((resp) => {
                getCats();
                toast(<NotificationSuccess text="Kitten Generated successfully."/>);
            });
        } catch (error) {
            console.log({error});
            toast(<NotificationError text={`${error || 'Failed to create kitten.'}`}/>);
        } finally {
            setLoading(false);
        }
    };
    return !loading ? (
        <>
            <div className="row">
                <div className="col-md-4">
                    <Card style={{width: '22rem'}}>
                        <Card.Body className="catBox generator">
                            <Cat dna={dna}/>
                            <Card.Text>
                                <span> <b>PRICE:</b> {price}</span>
                                <span> <b>CLONEPRICE:</b> {clonePrice}</span>
                                <span> <b>NAME:</b> {name}</span>
                                <span> <b>DNA:</b> {dna}</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-8 cattributes light-b-shadow">
                    <Form>
                        <FloatingLabel
                            controlId="cat_name"
                            label="Cat name"
                            className="mb-3"
                        >
                            <Form.Control
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                type="text" placeholder="Enter Cat name"/>
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="cat_price"
                            label="Cat price"
                            className="mb-3"
                        >
                            <Form.Control
                                onChange={(e) => {
                                    if (e.target.value === clonePrice) {
                                        toast(<NotificationError
                                            text={"Clone price shouldn't be the same with price"}/>);
                                        return
                                    }
                                    setPrice(e.target.value)
                                }}
                                type="number" placeholder="Enter Cat price"/>
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="cat_price"
                            label="Cat clone price"
                            className="mb-3"
                        >
                            <Form.Control
                                onChange={(e) => {
                                    if (e.target.value === price) {
                                        toast(<NotificationError
                                            text={"Clone price shouldn't be the same with price"}/>);
                                        return
                                    }
                                    setClonePrice(e.target.value)
                                }}
                                type="number" min={1} max={2} placeholder="Enter Cat clone price"/>
                        </FloatingLabel>
                    </Form>
                    {/*Cat colors*/}
                    <div id="catColors">
                        <div className="form-group">
                            <label htmlFor="formControlRange"><b>Head and body</b>
                                <Badge bg="secondary" className="m-lg-2">Code: {headcolor}</Badge>
                            </label>
                            <input
                                onChange={(e) => {
                                    setHeadcolor(e.target.value)
                                }}
                                type="range" min="10" max="98"
                                className="form-control-range w-100" value={headcolor}
                                id="bodycolor"/>
                            <label htmlFor="mouthColor"><b>Mouth / Belly </b>
                                <Badge bg="secondary" className="m-lg-2">Code: {mouthColor}</Badge>
                            </label>
                            <input
                                onChange={(e) => {
                                    setMouthColor(e.target.value)
                                }}
                                type="range" min="10" max="98"
                                className="form-control-range w-100" value={mouthColor}
                                id="mouthColor"/>
                            <label htmlFor="eyeColor"><b>Eyes</b>
                                <Badge bg="secondary" className="m-lg-2">Code: {eyesColor}</Badge>
                            </label>
                            <input
                                onChange={(e) => {
                                    setEyesColor(e.target.value)
                                }}
                                type="range" min="10" max="98"
                                className="form-control-range w-100" value={eyesColor}
                                id="eyeColor"/>
                            <label htmlFor="earsColor"><b>Ears / Paw /Tail</b>
                                <Badge bg="secondary" className="m-lg-2">Code: {earsColor}</Badge>
                            </label>
                            <input
                                onChange={(e) => {
                                    setEarsColor(e.target.value)
                                }}
                                type="range" min="10" max="98"
                                className="form-control-range w-100" value={earsColor}
                                id="earsColor"/>
                            <label htmlFor="decColor"><b>Decoration</b>
                                <Badge bg="secondary" className="m-lg-2">Code: {decorationColor}</Badge>
                            </label>
                            <input
                                onChange={(e) => {
                                    setDecorationColor(e.target.value)
                                }}
                                type="range" min="10" max="98"
                                className="form-control-range w-100" value={decorationColor}
                                id="decColor"/>
                            <label htmlFor="decColor"><b>Animation</b>
                                <Badge bg="secondary" className="m-lg-2">Code: {animations[animation]?.name}</Badge>
                            </label>
                            <input
                                onChange={(e) => {
                                    setAnimation(e.target.value)
                                }}
                                type="range" min="1" max="4"
                                className="form-control-range w-100" value={animation}
                                id="decColor"/>
                        </div>
                    </div>

                    <Button
                        variant="secondary"
                        disabled={!(name && dna.trim() && price)}
                        type="submit"
                        onClick={() => addCat({
                            name,
                            price,
                            clonePrice,
                            dna
                        })}
                    >
                        Create Cat
                    </Button>
                </div>
            </div>
        </>
    ) : (
        <Loader/>
    );
};

/*Generator.propTypes = {
    save: PropTypes.func.isRequired,
};*/

export default Generator;