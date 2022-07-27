import axios from "../axios";
import qs from "qs";

class BookingService {
    createBooking = async (data) => {
        console.log("form data: " + JSON.stringify(data))
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const promise = new Promise((resolve, reject) => {
            axios.post('booking', JSON.stringify(data),config)
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

    updateBooking = async (data) => {
        console.log("form data: " + JSON.stringify(data))
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const promise = new Promise((resolve, reject) => {
            axios.put('booking', JSON.stringify(data),config)
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
            axios.get('booking/new')
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    return resolve(er)
                })
        })
        return await promise
    }

    fetchBooking = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('booking')
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
export default new BookingService();