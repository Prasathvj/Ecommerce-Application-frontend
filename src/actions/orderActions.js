import {adminOrdersFail, adminOrdersRequest, adminOrdersSuccess, createOrderFail, createOrderRequest, createOrderSuccess, deleteOrderFail, deleteOrderRequest, deleteOrderSuccess, orderDetailFail, orderDetailRequest, orderDetailSuccess, updateOrderFail, updateOrderRequest, updateOrderSuccess, userOrdersFail, userOrdersRequest, userOrdersSuccess } from '../slices/orderSlice';
import axios from 'axios';

export const createOrder = order => async(dispatch) => {
    try {
       dispatch(createOrderRequest())
       const {data} = await axios.post(`https://ecommerce-application-ynf3.onrender.com/api/v1/order/new`, order,{
        headers:{
            Authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
       })
       dispatch(createOrderSuccess(data))
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
    }
}
export const userOrders = async(dispatch) => {
    try {
       dispatch(userOrdersRequest())
       const {data} = await axios.get(`https://ecommerce-application-ynf3.onrender.com/api/v1/myorders`,{
        headers:{
            Authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
       })
       dispatch(userOrdersSuccess(data))
    } catch (error) {
        dispatch(userOrdersFail(error.response.data.message))
    }
}
export const orderDetail = id => async(dispatch) => {
    try {
       dispatch(orderDetailRequest())
       const {data} = await axios.get(`https://ecommerce-application-ynf3.onrender.com/api/v1/order/${id}`,{
        headers:{
            Authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
       })
       dispatch(orderDetailSuccess(data))
    } catch (error) {
        dispatch(orderDetailFail(error.response.data.message))
    }
}

export const adminOrders = async(dispatch) => {
    try {
       dispatch(adminOrdersRequest())
       const {data} = await axios.get(`https://ecommerce-application-ynf3.onrender.com/api/v1/admin/orders`,{
        headers:{
            Authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
       })
       dispatch(adminOrdersSuccess(data))
    } catch (error) {
        dispatch(adminOrdersFail(error.response.data.message))
    }
}

export const deleteOrder = id => async(dispatch) => {
    try {
       dispatch(deleteOrderRequest())
       await axios.delete(`https://ecommerce-application-ynf3.onrender.com/api/v1/admin/order/${id}`,{
        headers:{
            Authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
       })
       dispatch(deleteOrderSuccess())
    } catch (error) {
       dispatch(deleteOrderFail(error.response.data.message))
    }
}

export const updateOrder = (id, orderData)  => async(dispatch) => {
    try {
       dispatch(updateOrderRequest())
       const { data} = await axios.put(`https://ecommerce-application-ynf3.onrender.com/api/v1/admin/order/${id}`, orderData,{
        headers:{
            Authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
       })
       dispatch(updateOrderSuccess(data))
    } catch (error) {
       dispatch(updateOrderFail(error.response.data.message))
    }
}