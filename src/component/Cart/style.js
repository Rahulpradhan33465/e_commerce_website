import { makeStyles } from "@material-ui/core";

export default makeStyles((theme)=>({
    toolbar:theme.mixins.toolbar,
    title:{
       marginTop:'5%',
    },
    emptyButton:{
        minWidth:'150px',
        marginBottom:'5%',
        marginRight:'10px',
        [theme.breakpoints.down('xs')]:{
            marginBottom:'5%',
        },
        [theme.breakpoints.down('xs')]:{
            marginRight:'20px',
        },
    },
    checkoutButton:{
        minWidth:'150px',
        marginBottom:'5%',
    },
    link:{
        textDecoration:'none',

    },
    cartDetails:{
        display:"flex",
        marginTop:'10%',
        width:'100%',
        justifyContent:'space-between'

    },
    

}));