import * as React from "react";
import {Component} from "react";

import {styleSheet} from "./style";
import {withStyles} from "@mui/styles";


class BookingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let {classes} = this.props;

        return (
            <div>

            </div>
        )
    }
}

export default withStyles(styleSheet)(BookingPage);
