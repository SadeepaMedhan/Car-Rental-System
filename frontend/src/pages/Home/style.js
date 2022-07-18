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
        height:'50px',
        backgroundColor: 'rgba(241,241,241,0.91)',
        zIndex:'4',
    },
    nav__logo:{
        height:'40px',
    },
    nav__item:{
        width: '80%',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',


    },nav__head:{
        fontFamily:'Arial',
        fontSize:'0.9em'
    },

    back__img:{
        position: 'absolute',
        width:'99vw',
        zIndex:'0',
    },
    book__back:{
        position: 'absolute',
        width:'88vw',
        // border:'gray solid',
        right: 0,
        left: 0,
        margin: 'auto',
        top: '60px',
        display:'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: 'rgba(149,157,194,0.31)',
        borderRadius:'8px',
    },
    book__item:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width:'168px',
        padding:'8px'

    },check__btn:{
        height:'50px',
        width:"120px",
    },

}