import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import './status.css';

const Service = (props) => {
    const history = useHistory();
    const notificationRef = useRef(null);

    const filterdCustomers = props.customerJsonData.filter(item => item.status === 'ACTIVE');
    const [customerData, setCustomerData] = useState(filterdCustomers);
    const [displayData, setDisplayData] = useState(5);
    const viewMore = () => {
        setDisplayData(displayData + 5);
    }

    const handlePayment = (id) => {
        props.changeStatus(id, "PAYMENT");
        history.push('/payment');
    }

    const handleNotification = () => {
        notificationRef.current.style.display = "none";
    }

    const CustomerList = () => {
        const elm = customerData.slice(0, displayData).map((customer)=>{
            return(
                <div className="customer" key={customer.id}>
                    <div className="status">
                        <div className="status-details">
                            <h3>Upcoming Service</h3>
                            <p>{customer.time}, {customer.date}</p>
                        </div>
                        <div className="status-progress-bar">
                            <ul className="step-progress-bar active1">
                                <li className="status-pending active">1</li>
                                <li className="status-active">2</li>
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

                    <h3 className="available-status">Check in here or scan customer's QR Code to check in when the service is about to start</h3>

                    <div className="available-time">
                        <i className="far fa-clock"></i>
                        <div className="av-date">{customer.availableDate}</div>
                        <div className="av-time">{customer.availableTime}</div>
                    </div>

                    <div className="customer-address">
                        {customer.address}
                    </div>

                    <div className="action">
                        <div>
                            <button className="checkinBtn">Check In</button>
                        </div>
                        <div>
                            <button className="invoiceBtn" onClick={()=>handlePayment(customer.id)}>Generate Invoice</button>
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
        <div className="service">
            <div className="serviceNotification" ref={notificationRef}>
                <div className="bar"></div>
                <div className="notification-text">
                    These are your upcoming services. You could scan your customer's QR Code before service to check-in, or scan QR Code to generate invoice for payments.
                </div>
                <div className="notification-close" onClick={handleNotification}>
                    <i className="fas fa-times-circle"></i>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Service);