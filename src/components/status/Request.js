import React, {useState} from 'react';
import './status.css';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

const Request = (props) => {
    const history = useHistory();
    const filterdCustomers = props.customerJsonData.filter(item => item.status === 'PENDING');
    const [customerData, setCustomerData] = useState(filterdCustomers);
    const [displayData, setDisplayData] = useState(5);
    const viewMore = () => {
        setDisplayData(displayData + 5);
    }

    const handleService = (id) => {
        props.changeStatus(id, "ACTIVE");
        history.push('/service');
    }

    const CustomerList = () => {
        const elm = customerData.slice(0, displayData).map((customer)=>{
            return(
                <div className="customer" key={customer.id}>
                    <div className="status">
                        <div className="status-details">
                            <h3>Pending Request</h3>
                            <p>{customer.time}, {customer.date}</p>
                        </div>
                        <div className="status-progress-bar">
                            <ul className="step-progress-bar">
                                <li className="status-pending">1</li>
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

                    <h3 className="available-status">This customer is available at:</h3>

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
                            <button className="rescheduleBtn">Reschedule</button>
                        </div>
                        <div>
                            <button className="acceptBtn" onClick={()=>handleService(customer.id)}>Accept Request</button>
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
        <div className="request">
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

export default connect(mapStateToProps, mapDispatchToProps)(Request);