import React, { useState, useEffect} from 'react'
import {
    Block,
    BlockHeadContent,
    BlockTitle,
    BlockBetween,
    BlockHead,
    Icon,
    Row,
    Col,

} from "../../../../components/Component";
import Head from "../../../../layout/head/Head";
import Content from "../../../../layout/content/Content";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody, Badge } from "reactstrap";
import axios from 'axios';
import { serverAPI } from '../.../../../../../index';
import { Spinner } from "reactstrap";
import { Rings } from 'react-loader-spinner'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WhatsappConfig() {
    const [formData, setFormData] = useState({
        phone: "91",
        message: "",
    });
    const [loading, setLoading] = useState(false);


    const [qrCode, setQrCode] = useState();
    const [clientInfo, setClientInfo] = useState(null);

    const fetchQrCode = async () => {

        try {
            setLoading(true);
            const response = await axios.get(`${serverAPI}whatsapp/login`);
            if (response.status === 200) {
                setQrCode(response.data.Imagelink);
                setLoading(false);
            }

        } catch (error) {
            console.log(error)
        }
    };



    const checkStatus = async () => {
        const response = await axios.get(`${serverAPI}whatsapp/status`);
        if (response.status === 200) {
            toast.success(<div className="toastr-text">
                <h5>WhatsApp is login with number</h5>
                <p>{response.data.clientInfo.wid._serialized}.</p>
            </div>, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: false,
                theme: "light",
            });
        } else {
            toast.warning(<div className="toastr-text">
                <h5>WhatsApp is got logout.</h5>
                <p>{response.data.clientInfo}.</p>
            </div>, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: false,
                theme: "light",
            });
        }
    };

    const handleSendMessage = async () => {
        const { phone, message } = formData;
        if(!phone || !message){
            toast.error('Missing phone or message parameter!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            setLoading(false);
        }
        try {
            if (phone && message) {
                const response = await axios.post(`${serverAPI}whatsapp/send?phone=${phone}&message=${message}`);
                if (response.status === 200) {
                    toast.success(response.data.message, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                    });
                    setLoading(false);
                    resetForm()
                } 
            }
        } catch (error) {
            toast.error('Please check your WhatsApp is logout!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            setLoading(false);
            resetForm();
        } 
        
        
        
    };

    // resets forms
    const resetForm = () => {
        setFormData({
            phone: "",
            message: "",
        });
    };
    // function to close the form modal
    const onFormCancel = () => {
        setView({ add: false, details: false });
        resetForm();
    };
    const [view, setView] = useState({
        add: false,
        details: false,
    });
    // toggle function to view order details
    const toggle = (type) => {
        setView({
            add: type === "add" ? true : false,
            details: type === "details" ? true : false,
        });
    };


    useEffect(() => {
        checkStatus();
        const interval = setInterval(checkStatus, 30000); // Check status every 5 seconds
    
        return () => clearInterval(interval); // Clean up the interval on component unmount
      }, []);
    return (
        <React.Fragment>
            <Head title="Order Default"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle>WhatsApp Config.</BlockTitle>
                        </BlockHeadContent>
                        <BlockHeadContent>
                            <div className="toggle-wrap nk-block-tools-toggle">
                                <a
                                    href="#more"
                                    className="btn btn-icon btn-trigger toggle-expand me-n1"
                                >
                                    <Icon name="more-v"></Icon>
                                </a>
                                <div className="toggle-expand-content" style={{ display: "block" }}>
                                    <ul className="nk-block-tools g-3">
                                        <li>
                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                    color="transparent"
                                                    className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                                                >
                                                    Status
                                                </DropdownToggle>
                                                <DropdownMenu end>
                                                    <ul className="link-list-opt no-bdr">
                                                        <li>
                                                            <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                                                <span>Login</span>
                                                            </DropdownItem>
                                                        </li>
                                                        <li>
                                                            <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                                                <span>Logout</span>
                                                            </DropdownItem>
                                                        </li>
                                                        <li>
                                                            <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                                                <span>Error</span>
                                                            </DropdownItem>
                                                        </li>
                                                    </ul>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </li>
                                        <li className="nk-block-tools-opt">
                                            <Button
                                                className="toggle btn-icon d-md-none"
                                                color="primary"
                                                onClick={() => {
                                                    toggle("add");
                                                }}
                                            >
                                                <Icon name="plus"></Icon>
                                            </Button>
                                            <Button
                                                className="toggle d-none d-md-inline-flex"
                                                color="primary"
                                                onClick={() => {
                                                    toggle("add");
                                                }}
                                            >
                                                <Icon name="plus"></Icon>
                                                <span>Send Messages</span>
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>

                <Block>
                    <div className="nk-tb-list is-separate is-medium mb-3">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <p >Point your phone to this screen to capture the QR code </p>
                            {qrCode ?
                                <div style={{ border: "10px solid #bef1d0", borderRadius: '8px', }}>
                                    <img src={qrCode} alt='qrcode' />
                                </div>
                                :
                                <div style={{ border: "10px solid #bef1d0", borderRadius: '8px', backgroundImage: 'url("https://res.cloudinary.com/dy4hpcssz/image/upload/v1689361045/tmhu7k5ghfco9cxewdj8.png")', height: '300px', width: '300px', display: 'flex', alignItem: 'center', justifyContent: 'center' }}>
                                    <Rings
                                        height="120"
                                        width="120"
                                        color="#fc3e84"
                                        radius="12"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                        ariaLabel="rings-loading"
                                    />
                                </div>
                            }
                            <Button
                                className="toggle d-none d-md-inline-flex "
                                color="primary"
                                style={{ marginTop: "20px" }}
                                onClick={fetchQrCode}
                            >
                                <Icon name="wallet-out"></Icon>
                                <span> {loading ? <Spinner size="sm" color="light" /> : "Re-Login"} </span>
                            </Button>

                            
                        </div>
                    </div>

                </Block>

                <Modal isOpen={view.add} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
                    <ModalBody>
                        <a href="#cancel" className="close">
                            {" "}
                            <Icon
                                name="cross-sm"
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    onFormCancel();
                                }}
                            ></Icon>
                        </a>
                        <div className="p-2">
                            <h5 className="title">Send Messages</h5>
                            <div className="mt-4">
                                <form >
                                    <Row className="g-3">
                                        <Col md="6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="date">
                                                    Phone Number
                                                </label>
                                                <div className="form-control-wrap">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="purchased">
                                                    Messages
                                                </label>
                                                <div className="form-control-wrap">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.message}
                                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col size="12">
                                            <Button color="primary" onClick={handleSendMessage}> 
                                                <Icon className="telegram"></Icon>
                                                <span> {loading ? <Spinner size="sm" color="light" /> : "Send"} </span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>



            </Content>
            <ToastContainer />
        </React.Fragment>
    )
}

export default WhatsappConfig