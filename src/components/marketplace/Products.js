import React, {useCallback, useEffect, useState} from "react";
import {toast} from "react-toastify";
import Loader from "../utils/Loader";
import {Button, Row} from "react-bootstrap";
import {NotificationError, NotificationSuccess} from "../utils/Notifications";
import {buyCat, cloneCat, getCats as getCatList,} from "../../utils/marketplace";
import {Link} from "react-router-dom";
import emptyImg from "../../assets/img/empty.jpg"
import Product from "./Product";

window.Buffer = window.Buffer || require("buffer").Buffer;

const Products = () => {
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCats = useCallback(async () => {
        try {
            setLoading(true);
            setCats(await getCatList());
        } catch (error) {
            console.log({error});
        } finally {
            setLoading(false);
        }
    }, []);

    const buy = async (id, price) => {
        try {
            await buyCat({
                id,
                price,
            }).then((resp) => getCats());
            toast(<NotificationSuccess text="Cat bought successfully"/>);
        } catch (error) {
            toast(<NotificationError text="Failed to purchase Cat."/>);
        } finally {
            setLoading(false);
        }
    };

    const clone = async (id, clonePrice) => {
        try {
            await cloneCat({
                id,
                clonePrice,
            }).then((resp) => getCats());
            toast(<NotificationSuccess text="Cat Cloned successfully"/>);
        } catch (error) {
            toast(<NotificationError text="Failed to Clone Cat."/>);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCats().then();
    }, [getCats]);

    return (
        <>
            {!loading ? (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="fs-4 fw-bold mb-0">Crypto Kitty Gallery</h1>
                        <Button
                            variant="dark"
                            className="rounded-pill px-0"
                            style={{width: "38px"}}
                        >
                            <Link to="/generator" className="text-white">
                                <i className="bi bi-plus"></i>
                            </Link>
                        </Button>
                    </div>
                    <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
                        {cats.map((_cat) => (
                            <Product
                                key={_cat.id}
                                cat={{
                                    ..._cat,
                                }}
                                buy={buy}
                                clone={clone}
                            />
                        ))}
                        <div className="empty-state">
                            {cats.length === 0 && (<img className="" src={emptyImg} alt=""/>)}
                        </div>
                    </Row>
                </>
            ) : (
                <Loader/>
            )}
        </>
    );
};

export default Products;