import customerJsonData from '../CUSTOMER_MOCK_DATA.json';
const iState = {
    data: customerJsonData
}

const reducer = (state=iState, action) => {
    switch (action.type) {
        case "CHANGE_STATUS":
            const id = action.payload.id;
            const status = action.payload.status;
            const updatedState = state.data.map(customer => {
                return customer.id===id? {...customer, status:status} : customer;
            })
            return {
                data: updatedState
            }
            break;
    
        default:
            return state;
            break;
    }
} 

export default reducer;