import React from 'react'
import { Typography,Card,CardMedia,CardActions,CardContent, Button } from '@material-ui/core'
import useStyles from './styles'
const CartItem = ({item,updateQuantity ,removeCart}) => {
    const classes=useStyles();

    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media}/>
                <CardContent className={classes.cardContent}>
                <Typography variant='h6'>{item.name}</Typography>
                <Typography variant='h6'>{item.line_total.formatted_with_symbol}</Typography>
                
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <div className={classes.button}>
                        <Button type='button' size='small' onClick={()=>updateQuantity(item.id,item.quantity+1)}>+</Button>
                        <Typography>{item.quantity}</Typography>
                        <Button type='button' size='small' onClick={()=>updateQuantity(item.id,item.quantity-1)}>-</Button>
                    </div>
                    <Button variant='contained' color='secondary' onClick={()=>removeCart(item.id)}>Remove</Button>

                </CardActions>
 
        </Card>
    )
}

export default CartItem
