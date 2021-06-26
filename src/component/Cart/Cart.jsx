import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import useStyles from './style';
import CartItem from '../CartItem/CartItem';
import {Link} from 'react-router-dom'
const Cart = ({ cart,updateQuantity ,removeCart,clearCart  }) => {
    const classes=useStyles();
   

    const EmptyCart = () => {
        return <><Typography variant='subtitle1'>You Cart Is currently Empty</Typography>
                
                 <Link to='/' className={classes.link}>Add some Item</Link>
    </>
    }
    const FilledCart = () => {
        return (
            <>
                <Grid container spacing={3}>
                    {
                        cart.line_items.map((item) => {
                            return <Grid item xs={12} sm={4} key={item.id}>
                             <CartItem item={item} updateQuantity={updateQuantity} removeCart={removeCart}  />
                            </Grid>

                        })
                    }

                </Grid>

                <div className={classes.cartDetails}>
                    <Typography variant='h4'>
                        SubTotal:{cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <div >
                        <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={()=>clearCart()}>
                            Empty Cart
                        </Button>
                        <Button className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary' component={Link} to='/checkOut'>
                            Check Out
                        </Button>
                    </div>
                </div>
            </>
        )
    }

if( !cart.line_items) return <h1>Loading...</h1>

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant='h3' gutterBottom>Your Shopping Cart</Typography>
            { !cart.line_items.length ? <EmptyCart /> : <FilledCart />}

        </Container>
    )
}

export default Cart
