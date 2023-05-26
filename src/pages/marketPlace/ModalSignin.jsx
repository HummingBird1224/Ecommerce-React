import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Alert,
    InputAdornment
} from "@mui/material";
import Button from "@mui/material/Button";
import { sendEnquiry } from "../../services/marketItemServices";

function ModalSignin(props) {
    const {
        itemName,
        expectedPrice,
        itemQuantity,
        itemId,
        state,
        district,
        crop
    } = props

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [after, setAfter] = useState(false)
    const [afterTitle, setAfterTitle] = useState('')
    const [afterContent, setAfterContent] = useState('')
    const [error, setError] = useState();
    const [isErrorHidden, setErrorHidden] = useState(true);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };
    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };
    const clearFields = () => {
        setName('')
        setEmail('')
        setPhone('')
        csetQuantity('')
        setPrice('')
        setAfterTitle('')
        setAfterContentuseState('')
    };


    const handleAfterClose = () => {
        setAfter(false);
        props.handleClose()
        //  clearFields()
        window.location.reload()
    };
    async function onConfirm() {

        const data = {
            name: name,
            email: email,
            phone: phone,
            quantity: quantity,
            price: price,
            itemName: itemName,
            expectedPrice: expectedPrice,
            itemQuantity: itemQuantity,
            itemId: itemId,
            state: state,
            district: district,
            crop: crop
        };
        try {
            const result = await sendEnquiry(data);
            setAfter(true)
            setAfterTitle("Success")
            setAfterContent("Succesfull enquiry , we will contact you shortly")
        } catch (e) {
            setAfter(true)
            setAfterTitle("Failure")
            setAfterContent("Failed enquiry , Please try again")
        }

    }
    function validateEmail(email) {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }
        else {
            return false;
        }
    }

    function validatePhoneNumber(num) {
        if (/^\d{10}$/.test(num)) {
            return true;
        }
        else {
            return false;
        }
    }
    function validateNonEmptyName(name) {
        if (name !== undefined && name !== "") {
            return true;
        }
        else {
            return false;
        }
    }
    function validateQuantity(quantity) {
        if (quantity !== undefined && quantity !== "" && quantity !== 0) {
            return true;
        }
        else {
            return false;
        }
    }
    function validatPrice(price) {
        if (price !== undefined && price !== "" && price >= expectedPrice) {
            return true;
        }
        else {
            return false;
        }
    }


    function validateData() {
        if (
            !validateNonEmptyName(name) &&
            !validateEmail(email) &&
            !validatePhoneNumber(phone) &&
            !validateQuantity(quantity) &&
            !validatPrice(price)
        ) {
            setError("Fill All Required Field!");
            setErrorHidden(false);
        }
        else if (!validateEmail(email)) {
            setError("Enter Correct Email Address!");
            setErrorHidden(false);
        } else if (!validatePhoneNumber(phone)) {
            setError("Enter Correct Phone Number!");
            setErrorHidden(false);

        }
        else if (!validateNonEmptyName(name)) {
            setError("Enter Your Name!");
            setErrorHidden(false);

        }
        else if (!validateQuantity(quantity)) {
            setError("Enter A Valid Quantity!");
            setErrorHidden(false);

        }
        else if (!validatPrice(price)) {
            setError("Enter A Valid Price!");
            setErrorHidden(false);
        }
        else {
            setErrorHidden(true);
        }
    }
    useEffect(() => {
        validateData();
    }, [
        name,
        email,
        phone,
        quantity,
        price,
    ]);


    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullWidth
        >
            <DialogTitle>
                {props.title}
            </DialogTitle>
            <DialogContent>

                <TextField
                    fullWidth
                    margin="normal"
                    required={true}
                    id="name"
                    label="Your Name"
                    variant="outlined"
                    onChange={handleNameChange}
                    value={name}
                    error={name === ""}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    required={true}
                    id="email"
                    label="Your Email"
                    variant="outlined"
                    onChange={handleEmailChange}
                    value={email}
                    error={email === ''}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    required={true}
                    id="phone"
                    label="Your Phone"
                    variant="outlined"
                    type="number"
                    onChange={handlePhoneChange}
                    value={phone}
                    error={phone === ''}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    required={true}
                    id="quantity"
                    label="Quantity"
                    variant="outlined"
                    type="number"
                    InputProps={{
                        endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                    }}
                    onChange={handleQuantityChange}
                    value={quantity}
                    error={quantity === ''}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    required={true}
                    id="price"
                    label="Price"
                    variant="outlined"
                    type="number"
                    InputProps={{
                        endAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                    onChange={handlePriceChange}
                    value={price}
                    error={price === ''}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={onConfirm}>Submit</Button>
            </DialogActions>
            <div hidden={isErrorHidden}>
                <Alert severity="error">{error}</Alert>
            </div>
            {after &&
                <Dialog open={after} onClose={handleAfterClose
                }
                >
                    <DialogTitle>{afterTitle}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {afterContent}
                        </DialogContentText>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAfterClose}>Ok !</Button>
                    </DialogActions>
                </Dialog>
            }
        </Dialog>
    );
}

export default ModalSignin;

