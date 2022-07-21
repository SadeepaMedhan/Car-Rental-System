import axios from "../axios";
import qs from 'qs';

class CustomerService {
    createCustomer = async (data) => {
        console.log("form data: " + qs.stringify(data))
        const promise = new Promise((resolve, reject) => {
            axios.post('customer', qs.stringify(data))   //10s
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }

    fetchCustomer = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('customer')
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    return resolve(er)
                })
        })
        return await promise
    }
}
export default new CustomerService();