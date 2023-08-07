import { useElements, useStripe } from "@stripe/react-stripe-js"
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import {validateShipping} from '../cart/Shipping';
import {createOrder} from '../../actions/orderActions'
import { clearError as clearOrderError } from "../../slices/orderSlice";
import Alert from 'react-bootstrap/Alert';

export default function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const { user } = useSelector(state => state.authState)
    const {items:cartItems, shippingInfo } = useSelector(state => state.cartState)
    const { error:orderError } = useSelector(state => state.orderState)
    
    
    const paymentData = {
        amount : Math.round( orderInfo.totalPrice * 100),
        shipping :{
            name: user.name,
            address:{
                city: shippingInfo.city,
                postal_code : shippingInfo.postalCode,
                country: shippingInfo.country,
                state: shippingInfo.state,
                line1 : shippingInfo.address
            },
            phone: shippingInfo.phoneNo
        }
    }

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

    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector('#pay_btn').disabled = true;
        try {
            const {data} = await axios.post('https://ecommerce-application-ynf3.onrender.com/api/v1/payment/process', paymentData,{
                headers:{
                    Authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
            const clientSecret = data.client_secret
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            })

            if(result.error){
                toast(result.error.message, {
                    type: 'error',
                    position: toast.POSITION.BOTTOM_CENTER
                })
                document.querySelector('#pay_btn').disabled = false;
            }else{
                if((await result).paymentIntent.status === 'succeeded') {
                    toast('Payment Success!', {
                        type: 'success',
                        position: toast.POSITION.TOP_RIGHT
                    })
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(orderCompleted())
                    dispatch(createOrder(order))

                    navigate('/order/success')
                    return
                }else{
                    toast('Please Try again!', {
                        type: 'warning',
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                }
            }


        } catch (error) {
            console.log(error)
        }
    }


     return (
        <div>
             <div className='admin-popup'>
                <img className="arrow-img" src='https://3.bp.blogspot.com/-7p7u_Imcauc/W6BcRIbrW3I/AAAAAAAMKiU/4M212erT13snd7ncKI9S2dV37ikVQnTsQCLcBGAs/s1600/AS0004412_00.gif'/>
                <Alert key='primary' variant='primary'>
                <div>
                    <h3><b style={{color:'black'}}>CARD Info:</b></h3> 
                   <p>Card Number :<b> 4242 4242 4242 4242</b></p>
                   <p>Card Expiry:<b style={{color:'green'}}> Any future date</b></p>
                   <p>Card CVC:<b style={{color:'green'}}> Any 3 digits</b></p>
                </div>
                </Alert>
            </div>
        
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <h1 className="mb-4">Card Info</h1>
                    <div className="form-group">
                    <label htmlFor="card_num_field">Card Number</label>
                    <CardNumberElement
                        type="text"
                        id="card_num_field"
                        className="form-control"
                       
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="card_exp_field">Card Expiry</label>
                    <CardExpiryElement
                        type="text"
                        id="card_exp_field"
                        className="form-control"
                       
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="card_cvc_field">Card CVC</label>
                    <CardCvcElement
                        type="text"
                        id="card_cvc_field"
                        className="form-control"
                        value=""
                    />
                    </div>
        
                
                    <button
                    id="pay_btn"
                    type="submit"
                    className="btn btn-block py-3"
                    >
                    Pay - { ` $${orderInfo.totalPrice}` }
                    </button>
        
                </form>
            </div>
        </div>
        </div>
    )
}