import React,{useState,useEffect} from 'react'
import {Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button,CssBaseline} from '@material-ui/core'
import useStyles from './style';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import {Link,useHistory} from 'react-router-dom'
const step=['shipping Address','payment Details'];
const CheckOut = ({cart,order,onCheckOut,error, refreshCart }) => {
    const classes=useStyles();
    const history=useHistory();
    const [activeState,setActiveState]=useState(0);
    const [checkOutTooken,setCheckOutTooken]=useState();
    const [shippingData,setShippingData]=useState({});
    const [isFineshed,setIsFinished]=useState(false);
const nextStep=()=>setActiveState((prevActiveState)=>prevActiveState+1);
const prevStep=()=>setActiveState((prevActiveState)=>prevActiveState-1);

const next=(data)=>{
    console.log(data);
setShippingData(data);
nextStep();
}
 const timeOut=()=>{
     setTimeout(() => {
        setIsFinished(true);
     }, 3000);
 }

useEffect(() => {
    const generateToken=async()=>{
        try {
            const tooken=await commerce.checkout.generateToken(cart.id,{type:'cart'})
            console.log(tooken.id);
            setCheckOutTooken(tooken);
        } catch (error) {
            history.pushState('/');
        }
    }
    generateToken();
}, [cart])

const Form=()=>activeState===0 ? <AddressForm checkOutTooken={checkOutTooken} next={next} />: <PaymentForm shippingData={shippingData} checkOutTooken={checkOutTooken} backStep={prevStep} nextStep={nextStep} onCheckOut={onCheckOut} shippingData={shippingData} timeOut={timeOut}/>

let Confirmation=()=> order.customer?
  ( <>
        
           <div>
               <Typography variant='h5' >Thank you for your purchase,{order.customer.firstname} {order.customer.lastname}</Typography>
               <Divider className={classes.divider}/>
               <Typography variant='subtitle1'>Order Ref: {order.customer_reference}</Typography>

           </div>
           <br/>
           <Button component={Link} to='/' variant='outlined' type='button' >Back Home</Button>



    </>
    ):isFineshed ?(
        <>
        
           <div>
               
               <Typography variant='h5' >Thank you for your purchase </Typography>
               <Divider className={classes.divider}/>
               

           </div>
           <br/>
           <Button component={Link} to='/' variant='outlined' type='button' onClick={refreshCart}>Back Home</Button>



    </>
        
    ):(
         <div className={classes.spinner}>
             <CircularProgress/>
             </div>
    )


if(error){
    <>
    <Typography variant='h5'>Error:{error}</Typography>
    <br/>
    <Button component={Link} to='/' variant='outlined' type='button'>Back Home</Button>
    </>
}


 
    return (
        <>
        <CssBaseline/>
            <div className={classes.toolbar}/>
   <main className={classes.layout}>
  <Paper className={classes.paper}>
      <Typography variant='h4' align='center'>CheckOut</Typography>
      <Stepper activeStep={activeState} className={classes.stepper} >
{
    step.map((step)=>(
        <Step key={step}>
         <StepLabel>{step}</StepLabel>
        </Step>
    ))
}
      </Stepper>
      {activeState===step.length ?<Confirmation/>:checkOutTooken &&<Form/>}
  </Paper>
       </main>
          
        </>
    )
}

export default CheckOut
