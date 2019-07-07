import React, {Component} from "react";
import Auxiliar from "../Auxiliar/Auxiliar";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        constructor(props) {
            super(props);
            this.reqInterceptor = axios.interceptors.request.use(req => {
               this.setState({error: null});
               return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })
        }

        errorConfirmHandler = () => {
            this.setState({error: null});
        };

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        render() {
            return (
                <Auxiliar>
                    <Modal show = {this.state.error} modalClosed={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliar>
            )
        }
    }
};


export default withErrorHandler;
