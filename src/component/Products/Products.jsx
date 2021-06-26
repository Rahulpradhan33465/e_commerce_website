import React from 'react';
import {Grid} from '@material-ui/core'
import SingleProduct from './Product/SingleProduct';
import useStyles from './style';

 
// console.log(products)
const Products = ({products,onAddCart}) => {
    const classes=useStyles();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify='center' spacing={4}>
                {
                    products.map((product) => {
                       return (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} >
                        <SingleProduct  product={product} onAddCart={onAddCart}/>
                   </Grid>
                       )
                    })
                }
            </Grid>
        </main>
    )
}


export default Products;