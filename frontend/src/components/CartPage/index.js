import { useState } from "react";


function CartPage() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [country, setCountry] = useState("");
    
    return (
        <>
            <div className="container cart">
                <h1>Cart</h1>
                <div className="table-header">
                    <div className="table-cell">Product</div>
                    <div className="table-cell">Quantity</div>
                    <div className="table-cell">Price</div>
                </div>
                <div className="table-header right">
                    <form>

                    </form>
                </div>
            </div>
        </>
    )
}

export default CartPage;
