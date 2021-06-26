import React from 'react'
import {Typography,Button,Divider} from '@material-ui/core';
import {Elements,CardElement,ElementsConsumer} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review'

const stripePromise=loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const PaymentForm = ({checkOutTooken,backStep,onCheckOut,nextStep,shippingData,timeOut}) => {
    const handelSubmit=async (event,elements,stripe)=>{
        event.preventDefault();
   
        if(!stripe || !elements) return;
   
        const cardElement=elements.getElement(CardElement)
        const {error,paymentMethod}=await stripe.createPaymentMethod({type:'card',card:cardElement});
   
   
        if(error){
            console.log('[error]',error);
        }
        else{
           
            const orderData={
                line_items:checkOutTooken.live.line_items,
                customer:{firstname:shippingData.firstName,lastname:shippingData.lastName,email:shippingData.email},
                shipping:{
                    name:'International',
                    street:shippingData.address1,
                    town_city:shippingData.city,
                    county_state:shippingData.division,
                    postal_zip_code:shippingData.zip,
                    country:shippingData.country,
   
                },
                fullfillment:{shipping_method:shippingData.option},
                payment:{
                    getway:'stripe',
                    stripe:{
                        payment_method_id:paymentMethod.id
                    },
   
                },
   
   
            };
            onCheckOut(checkOutTooken.id,orderData);
            timeOut();
            nextStep();
        }
   };
   
    return (
      <>
     <Review checkOutTooken={checkOutTooken}/>
     <Divider/>
     <Typography variant='h6' style={{margin:'20px 0'}} gutterBottom>Payment Method</Typography>
     <Elements stripe={stripePromise}>
         <ElementsConsumer>
             {
                 ({elements,stripe})=>(
                  <form onSubmit={(e)=>handelSubmit(e,elements,stripe)}>
                      <CardElement/>
                      <br/><br/>
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                          <Button variant='outlined' color='secondary' onClick={backStep}>back</Button>
                          <Button type='submit' variant='contained' color='primary' disabled={!stripe}>
                              pay {checkOutTooken.live.subtotal.formatted_with_symbol}
                          </Button>

                      </div>
                  </form>
                 )
             }
         </ElementsConsumer>

     </Elements>
      </>
    )
}

export default PaymentForm
