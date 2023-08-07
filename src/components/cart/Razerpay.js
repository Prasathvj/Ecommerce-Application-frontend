import React from 'react'
import axios from "axios";
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import {validateShipping} from '../cart/Shipping';
import {createOrder} from '../../actions/orderActions'
import { clearError as clearOrderError } from "../../slices/orderSlice";
import razerpayLogo from '../../images/razerPay.png'

function Razerpay() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const { user } = useSelector(state => state.authState)
    const {items:cartItems, shippingInfo } = useSelector(state => state.cartState)
    const { error:orderError } = useSelector(state => state.orderState)
    

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    if(orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
        
    }

    useEffect(() => {
        validateShipping(shippingInfo, navigate)
        if(orderError) {
            toast(orderError, {
                position: toast.POSITION.TOP_RIGHT,
                type: 'error',
                onOpen: ()=> { dispatch(clearOrderError()) }
            })
            return
        }

    },[])

    //razer pay
    const handleOpenRazorpay = (data) => {

        const options = {
            key: 'rzp_test_f6mxNa7ao2fEfK',
            amount: Number(data.amount),
            currency: data.currency,
            order_id: data.id,
            name: 'SHOPPING APP',//
            description: 'XYZ',//
            handler: async function (response) {
                console.log(response, "34")
                order.paymentInfo = {
                    id: response.razorpay_order_id,
                    status: response.razorpay_payment_id
                }
                dispatch(orderCompleted())
                dispatch(createOrder(order))
                console.log(order,'2')
        
                navigate('/order/success')
                
                const data =await axios.post('http://localhost:9090/api/v1/verify', { response: response },{
                    headers:{
                        Authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    }
                })   
            }

        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const handlePayment =async(amount)=> {
         amount = Math.round( orderInfo.totalPrice);
        try {
            const _pay = { amount: amount}
            const {data}= await axios.post('http://localhost:9090/api/v1/order', _pay,{
                    headers:{
                        Authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    }
            })
            console.log(data)
            if(data){
                handleOpenRazorpay(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    
            <div className="row wrapper"> 
                <div className="col-10 col-lg-5 shadow-lg" style={{borderRadius:'30px',padding:'3rem'}}>
                    
                        <h1 className="mb-3" style={{textAlign:'center',fontSize:'1.5rem'}}>confirm payment</h1>
                        
                        <div className='razerpay'>
                            <img src={razerpayLogo} alt='Razerpay company' />

                            
                        </div>
                        <button
                            id="rzp-button1"
                            type="submit"
                            className="m-3 btn btn-block py-2 px-3"
                            onClick={()=>handlePayment(Number(orderInfo.totalPrice))}
                            >
                            Pay - { ` $${orderInfo.totalPrice}` }
                        </button>

                   
                </div>
                
            </div>

  )
}

export default Razerpay