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
        fontFamily:'Arial',
        fontSize:'1.2em'
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


    suggest__result_box:{
         position: 'absolute',
        // flexWrap: 'wrap',
         top:'35vh',
         width:'88vw',
         //border:'red solid',
         right: 0,
         left: 0,
         margin: 'auto !important',
         display:'flex',
        alignItems:'center',
         justifyContent: 'center',

    },
    suggest__result:{
        //  position: 'absolute',
        //flexWrap: 'wrap',
        //top:'35vh',
         width:'90%',
         height:'200px',
        // border:'green solid',
        // display:'flex',
        // justifyContent: 'center',
        //backgroundColor: 'rgba(149,157,194,0.31)',

    },

}