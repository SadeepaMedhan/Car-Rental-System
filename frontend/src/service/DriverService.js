import axios from "../axios";
import qs from "qs";

class DriverService {
    postDriver = async (data) => {
        console.log("form data: " + qs.stringify(data))
        const promise = new Promise((resolve, reject) => {
            axios.post('driver', qs.stringify(data))   //10s
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
    updateDriver = async (data) => {
        console.log("form data: " + JSON.stringify(data))
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const promise = new Promise((resolve, reject) => {

            axios.put('driver', JSON.stringify(data),config)
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

    fetchDrivers = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('driver')
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    return resolve(er)
                })
        })
        return await promise
    }
    fetchNewId = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('driver/new')
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    return resolve(er)
                })
        })
        return await promise
    }

    deleteDriver = async (params) => {
        const promise = new Promise((resolve, reject) => {
            axios.delete('driver', {params: params})
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;
    };


    getSchedule = async (diverId) => {
        const promise = new Promise((resolve, reject) => {
            axios.get('driver/schedule',{params: diverId})
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    return resolve(er)
                })
        })
        return await promise
    }

    findDriver = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.get('driver/'+data)
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
export default new DriverService();