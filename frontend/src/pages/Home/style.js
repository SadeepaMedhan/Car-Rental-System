export const styleSheet = {
    back__floor:{
        position:'relative',
        display:'flex',
        width:'100vw',
        height:'100vh',
        border:'gray solid',
    },
    nav__bar:{
        position:'static',
        display:'flex',
        width:'100%',
        height:'50px',
        border:'gray solid',
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


    },
    tab__lis:{
        display:'flex',
        margin: 0,
        padding: '0 15px 0',
        float: 'left',
    },
    tab__lis__item:{
        display: 'inline-block',
        fontFamily: 'open_sansbold',
        textTransform: 'uppercase',
        fontSize: '14px',
        //lineHeight: 1.42857143,
        color: '#333',
        border: 'none',
        textAlign: 'center',

    },
    tab__lis__item_link:{
        cursor: 'pointer',
        textDecoration: 'none !important',
        width: '100%',
        padding: '0 10px',
        height: '30px',
        display: 'block',
        lineHeight: '30px',
        color: '#000',
        fontSize: '12px',
        fontWeight: 500,
        fontFamily: 'Poppins',
        textTransform: 'uppercase',
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
        justifyContent: 'center'

    },
    book__item:{
        display:'flex',
        alignItems: 'center',

    },check__btn:{
        height:'50px',
        width:"120px",

    },
}