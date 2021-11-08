import React, {useState} from 'react';
import './status.css';
import {connect} from 'react-redux';

const Payment = (props) => {

    const filterdCustomers = props.customerJsonData.filter(item => item.status === 'PAYMENT');
    const [customerData, setCustomerData] = useState(filterdCustomers);
    const [displayData, setDisplayData] = useState(5);
    const viewMore = () => {
        setDisplayData(displayData + 5);
    }

    const CustomerList = () => {
        const elm = customerData.slice(0, displayData).map((customer)=>{
            return(
                <div className="customer" key={customer.id}>
                    <div className="status">
                        <div className="status-details">
                            <h3>Pending Payment</h3>
                            <p>{customer.time}, {customer.date}</p>
                        </div>
                        <div className="status-progress-bar">
                            <ul className="step-progress-bar active1 active2">
                                <li className="status-pending active">1</li>
                                <li className="status-active active">2</li>
                                <li className="status-payment">3</li>
                            </ul>
                        </div>
                    </div>

                    <div className="customer-detail">
                        <div className="customer-profile">
                            <div className="customer-pic">
                                <img src={customer.profileImage}/>
                            </div>
                            <div className="customer-name">
                                <h2>{customer.firstName} {customer.lastName}</h2>
                                <h4>{customer.city}</h4>
                            </div>
                        </div>
                        <div className="deals">
                            <i className="far fa-handshake fa-5x"></i>
                            <h2>You two had {customer.deals} deals before.</h2>
                        </div>
                    </div>

                    <h3 className="available-status">Service is complete, please confirm payment amount:</h3>

                    <div className="invoice">
                        <h2><i class="fas fa-file-invoice-dollar"></i> Invoice item:</h2>
                        <div className="invoice-price">
                            <p>Session Price</p>
                            <p className="amount">$ 80.00</p>
                        </div>
                    </div>

                    <div className="action">
                        <div>
                            <button className="chatBtn">Start a Chat</button>
                        </div>
                        <div>
                            <button className="resendInvoiceBtn">Resend Invoice</button>
                        </div>
                        <div className="more">
                            ...<br/>More
                        </div>
                    </div>
                </div>
            )
        })
        return elm;
    }
    return(
        <div className="payment">
            {CustomerList()}
            {
                displayData < customerData.length ? (
                    <div className="view-more">
                        <button onClick={viewMore}>View More</button>
                    </div>
                )
                :
                (
                    <div className="no-view-more">No more service requests</div>
                )
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        customerJsonData: state.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeStatus: (id, status) => {
            dispatch({type: "CHANGE_STATUS", payload: {id, status}});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);