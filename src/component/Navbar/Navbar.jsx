import React from 'react'
import {AppBar,Toolbar,IconButton,Menu,MenuItem,Badge,Typography} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import useStyle from './style'
import {Link,useLocation} from 'react-router-dom'
const Navbar = ({totalItem}) => {
    const classes=useStyle();
    const location=useLocation();
    return (
        <>
          <AppBar position='fixed' className={classes.appBar} color='inherit'  >
              <Toolbar >
                  <Typography variant='h6' className={classes.title} color='inherit' component={Link} to='/' >
                  <img src='https://toppng.com/uploads/preview/online-stores-11550201033htm0rug6im.png' alt='commerce.js' height='25px' className={classes.image}/>
                 Buy Online
                  </Typography>
                 
              </Toolbar>
              <div className={classes.grow}/>
              <div className={classes.button}>
                  {location.pathname==='/' &&(
                  <IconButton aria-label='Show cart items' color='inherit' component={Link} to='/cart' >
                      <Badge badgeContent={totalItem} color='secondary'>
                          <ShoppingCart/>
                            </Badge>

                  </IconButton>)
}
              </div>
         </AppBar>  
        </>
    )
}

export default Navbar
