import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import * as actions from '../../actions';
import {connect} from 'react-redux'

const renderInput = ({input,type,label,meta:{touched, error}}) => {
    return (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} palceholder={label} type={type} className="form-control" />
                {touched && error && <span className="error danger">{error}</span>}
            </div>
        </div>
    );
}


class Signup extends Component {
    handleFormSubmit({ email, password}) {
        console.log(email, password);
        this.props.signupUser({ email, password });
    }    
    
    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong>{this.props.errorMessage}
                </div>
            );
        }
    }
    
    render(){
        const { handleSubmit } = this.props;
        return(

            <form onSubmit = {handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field name="email" type="email" component={renderInput} label="Email:"/>
                <Field name="password" type="password" component={renderInput} label="Password:"/>
                <Field name="confirmPassword" type="password" component={renderInput} label="Confirm Password:"/>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up!</button>
            </form>
        );
    }
}

const validate = formProps => {
    const errors = {}
        if(formProps.password != formProps.confirmPassword) {
            errors.confirmPassword= 'Passwords must match'
        }

        if(!formProps.email) {
            errors.email = 'Must enter password'
        }

        if(!formProps.password) {
            errors.password = 'Please enter password'
        }

    return errors;
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    };
} 

Signup = connect(mapStateToProps, actions)(Signup);
export default reduxForm({
    form: 'signup',
    validate
})(Signup)