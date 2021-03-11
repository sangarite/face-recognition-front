import React from 'react';
import Loading from '../Loading/loading';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      isLoading: false
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    this.setState({isLoading: true});
    fetch('https://fast-fortress-39267.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      } else { window.alert(user)}
      this.setState({isLoading: false});
    })
    .catch(err => {
      console.log(err);
      this.setState({isLoading: false});
    })
  }

  render() {
    const { onRouteChange } = this.props;
    if (this.state.isLoading) return <Loading />
    else
      return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className=" b f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange = {this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange = {this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div>
              <input
                onClick={this.onSubmitSignIn}
                className="f5 grow bg-transparent br-pill ba b--black ph4 pv2"
                type="submit"
                value="Done"
              />
            </div>
            <div className="lh-copy mt3">
              <p className="fl w-50 mv0">New user?</p>
              <p onClick={() => onRouteChange('register')} className="f5 link grow black db pointer i fl w-50 mv0 ">Press here</p>
            </div>
          </div>
        </main>
      </article>
      );
  }
}

export default Signin;
