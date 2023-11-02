import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Card from "../Card";
import { useEffect, useState } from "react";
import { loadUserBillingsThunk } from "../../store/billingaddress";
import BillingDetails from "../BillingDetails";
const Profile = () => {
  const dispatch = useDispatch(); 
    const [billing, setBilling] = useState('')
    
    const user = useSelector(state => state.session.user)

    useEffect(()=> {
        dispatch(loadUserBillingsThunk(user.id))
        
    }, [])
    console.log("here: ", user)
    if(!user){
        return <Redirect to="/login" />
    }
    return (
					<>
						<Card>
							<div className="profile-name">
								<h1>{user.username}</h1>
							</div>

                            <div className="billing-details">
                                <h2>Billing Details</h2>
                                <h3>Address</h3>
                                <BillingDetails userId={user.id}/>
                                {/* {!billingDetails.length ? <>
                                    <div><p>fgrgrerger</p>You do not have a stored billing address

                                    </div>
                                </> : <></>} */}
                            </div>
						</Card>
					</>
				);
}
 
export default Profile;