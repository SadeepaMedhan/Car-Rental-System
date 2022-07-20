export const styleSheet = {
    back__floor:{
        position:'relative',
        display:'flex',
        width:'100vw',
        height:'100vh',
    },
    nav__bar:{
        position:'fixed',
        display:'flex',
        width:'100%',
        height:'10%',
        backgroundColor: 'rgba(255,252,252,0.95)',
        zIndex:'4',
    },
    nav__logo:{
        height:'10vh',
    },
    nav__item:{
        width: '80%',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',


    },nav__head:{
        fontFamily:'Convergence',
        fontSize:'1.2em'
    },
    topic__text:{
        position:'absolute',
        fontFamily:'Convergence',
        fontSize:'2em',
        textAlign:'center',
        zIndex:3,
        color:'white',
        width:'100vw',
        textShadow: '1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue',

    },
    maintopic__text:{
        marginTop:'50px',
    },
    subtopic__text:{
        marginTop:'60px',
    },

    back__img:{
        position: 'absolute',
        width:'100vw',
        zIndex:'0',
    },
    book__back:{
        position: 'absolute',
        width:'88vw',
        // border:'gray solid',
        right: 0,
        left: 0,
        margin: 'auto',
        top: '65%',
        display:'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,252,252,0.95)',
        borderRadius:'8px',
        zIndex:'5',
    },
    book__item:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width:'168px',
        padding:'8px',


    },check__btn:{
        height:'50px',
        width:"120px",
    },
    //---------------------------------


    scroll__box:{
         position: 'absolute',
        // flexWrap: 'wrap',
         top:'70vh',
         width:'100vw',
         border:'blue solid',
         right: 0,
         left: 0,
         margin: 'auto !important',
         display:'flex',
        alignItems:'center',
         justifyContent: 'center',

    },  suggest__result_box:{
        //backgroundColor:'black',
        height:'80vh',
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent: 'center',
        border:'gray solid',

    },
    service_box:{
        height:'80vh',
        width:'100%',

    },
    suggest__result:{
        margin: 'auto',
         width:'90%',
         height:'200px',
         border:'green solid',
    },

}