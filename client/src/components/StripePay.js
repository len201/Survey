import React, { Component } from 'react';
import StripeCheckout from "react-stripe-checkout";
import { connect } from 'react-redux';
import * as actions from '../actions';

class StripePay extends Component {
    render() {
        return (
            <StripeCheckout
                name="Survey Wombat"
                description="$5 for 5 survey credits"
                amount={500} //amt is cents in US$
                token={ token => this.props.handleToken(token) }
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    ADD CREDITS
                </button>
            </StripeCheckout>
        );
    }
}
export default connect(null, actions)(StripePay);