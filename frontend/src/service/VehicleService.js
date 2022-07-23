import axios from "../axios";
import qs from "qs";

class VehicleService {
    createVehicle = async (data) => {
        console.log("form data: " + qs.stringify(data))
        const promise = new Promise((resolve, reject) => {
            axios.post('vehicle', qs.stringify(data))   //10s
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
    updateVehicle = async (data) => {
            console.log("form data: " + JSON.stringify(data))
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
            const promise = new Promise((resolve, reject) => {

                axios.put('vehicle', JSON.stringify(data),config)
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

    fetchVehicles = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('vehicle')
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
            axios.get('vehicle/new')
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    return resolve(er)
                })
        })
        return await promise
    }

    deleteVehicle = async (params) => {
        const promise = new Promise((resolve, reject) => {
            axios.delete('vehicle', {params: params})
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
export default new VehicleService();