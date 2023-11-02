import { useSelector } from "react-redux";
import './BillingDetails.css'
import { useState } from "react";
const BillingDetails = () => {
    const billingDetails = useSelector((state) => state.billingAddress);

	const [editing, setEdditing] = useState(false)
	let houseNumber, city, state, zipCode;
	const handleEdit = (e) =>{
		e.preventDefault()
		setEdditing(true)
		console.log(editing)
	}
    return (
					<>
						<form className="billing-details-form">
							<div className="street-address">
								<label>
									{" "}
									Street Address:
									{houseNumber ? houseNumber : "None "}
									{editing && <input value={houseNumber}/>}
								</label>
								<div className="city-state-zip">
									<label>
										City:
										{city ? city : " "}
									</label>
									<label>State</label>
									{state ? state : " "}

									<label>Zip Code</label>
										{state ? state : " "}
								</div>
							</div>
						</form>
						<button onClick={(e) => handleEdit(e)} > EDIT </button>	
					</>

				);
}
 
export default BillingDetails;