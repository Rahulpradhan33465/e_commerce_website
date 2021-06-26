import React,{useState,useEffect} from 'react'
import {InputLabel,Select,MenuItem,Button,Grid,Typography} from '@material-ui/core'
import { useForm,FormProvider} from 'react-hook-form'
import FormInput from './FormInput';
import {Link} from 'react-router-dom'
 import {commerce} from '../../lib/commerce'
const AddressForm = ({checkOutTooken,next}) => {
 
    const [countries,setCountries]=useState([]);
    const [country,setCountry]=useState('');
    const [divisions,setDivisions]=useState([]);
    const [division,setDivision]=useState('');
    const [options,setOptions]=useState([]);
    const [option,setOption]=useState('');
       const methods=useForm();

       const mycountries=Object.entries(countries).map(([code,name])=>({id:code,label:name}));
       const mysubdivision=Object.entries(divisions).map(([code,name])=>({id:code,label:name}));
       const myoptions=options.map((so)=>({id:so.id,label:`${so.description}-(${so.price.formatted_with_symbol})`}))
       
const fetchCountries=async (checkOutId)=>{
    const response=await commerce.services.localeListShippingCountries(checkOutId);
const{countries}=response;
// console.log(countries);
setCountries(countries);
setCountry(Object.keys(countries)[0])

}

const fetchSubdivision=async (countryCode)=>{
 
    const {subdivisions}=await commerce.services.localeListSubdivisions(countryCode);
    console.log(subdivisions);
    setDivisions(subdivisions);
    // console.log(subDivision)
    setDivision(Object.keys(subdivisions)[0]);
}
const fetchShippingOtions=async (checkOutTookenId,country,stateProvince=null)=>{
const options=await commerce.checkout.getShippingOptions(checkOutTookenId,{country,region:stateProvince})
setOptions(options);
// console.log(options[0]);
 
  setOption(options[0].id);
}

 useEffect(() => {
    if(division) fetchShippingOtions(checkOutTooken.id,country,division)
 }, [division])


useEffect(() => {
   fetchCountries(checkOutTooken.id);
}, [])

useEffect(() => {
   if(country) fetchSubdivision(country);
}, [country]);


// console.log(mysubdivision)

    return (
        <>
          <Typography variant='h6' gutterBottom>Shipping Address</Typography>
          <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit((data)=>next({...data,country,division,option}))}>
                  <Grid container spacing={3}>
               <FormInput required name='firstName' label='First Name'/>
                      <FormInput required name='lastName' label='Last Name'/>
                        <FormInput required name='address1' label='Address line 1'/>
                        <FormInput required name='email' label='E-mail'/>
                        <FormInput required name='city' label='City'/>
                        <FormInput required name='zip' label='Postal/pinCode'/>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping country</InputLabel>
                            <Select value={country} fullWidth onChange={(e)=>setCountry(e.target.value)}>
                               {
                                mycountries.map((item)=>(
                                    <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                   </MenuItem>

                                ))
                               }
                             

                            </Select>

                        </Grid>
                        {/* Shipping Subdivision */}
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={division} fullWidth onChange={(e)=>setDivision(e.target.value)}>
                               {
                                mysubdivision.map((item)=>(
                                    <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                   </MenuItem>

                                ))
                               }
                             

                            </Select>

                        </Grid>
                        {/* Choose option */}
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Option</InputLabel>
                            <Select value={option} fullWidth onChange={(e)=>setOption(e.target.value)}>
                               {
                                myoptions.map((item)=>(
                                    <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                   </MenuItem>

                                ))
                               }
                             

                            </Select>

                        </Grid>
                  </Grid>
                  <br/>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                <Button component={Link} to='/cart' variant='outlined' color='secondary'>Back Cart</Button>
                <Button type='submit' variant='contained' color='primary'>Next</Button>
            </div>
        

              </form>
          </FormProvider>
        </>
    )
}

export default AddressForm
