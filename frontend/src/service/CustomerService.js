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

    fetchCustomers = async () => {
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

    updateCustomer = async (data) => {
        console.log("form data: " + JSON.stringify(data))
        const config = {headers: {'Content-Type': 'application/json'}}
        const promise = new Promise((resolve, reject) => {

            axios.put('customer', JSON.stringify(data),config)
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
    fetchNewId = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('customer/new')
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    return resolve(er)
                })
        })
        return await promise
    }

    deleteCustomer = async (params) => {
        const promise = new Promise((resolve, reject) => {
            axios.delete('customer', {params: params})
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;
    };
}
export default new CustomerService();