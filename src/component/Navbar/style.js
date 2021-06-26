import {makeStyles,fade} from '@material-ui/core/styles'
const drawerWidth=0;

export default makeStyles((theme)=>({

    appBar:{
        boxShadow:'none',
        borderBottom:'1px solid rgba(0,0,0,0.12)',
        [theme.breakpoints.up('sm')]:{
            width:`calc(100% -${drawerWidth}px)`,
            marginLeft:drawerWidth,
        },
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    title:{
        flexGrow:1,
        alignItem:'center',
        display:'flex',
        textDecoration:'none'
    },
    image:{
        marginRight:'10px',
    },
    menuButton:{
        marginRight:theme.spacing(2),
        [theme.breakpoints.up('sm')]:{
            display:'none',

        }
    },
    grow:{
        flexGrow:1,
    },
    search:{
        position:'relative',
        borderRadious:theme.shape.borderRadious,
        backgroundColor:fade(theme.palette.common.white,0.15),
        '&:hover':{
            backgroundColor:fade(theme.palette.common.white,0.25),
        },
        marginRight:theme.spacing(2),
        marginLeft:0,
        width:'100%',
        [theme.breakpoints.up('sm')]:{
            width:'auto',
        }
    },
    searchIcon:{
        padding:theme.spacing(0,2),
        height:'100%',
        position:'absolute',
        pointEvents:'none',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    button:{
        marginRight:'20px'
    }



}))