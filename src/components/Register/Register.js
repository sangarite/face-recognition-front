import React from 'react';
import Loading from '../Loading/loading';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      isLoading: false
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }
  
  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onSubmitRegister = () => {
    this.setState({isLoading: true});
    fetch('https://fast-fortress-39267.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser(user)
        this.props.onRouteChange('home');
      } else { window.alert('there is already a user with this email')}
      this.setState({isLoading: false});
    })
    .catch(err => {
      console.log(err);
      this.setState({isLoading: false});
    })
  }

  render() {
    if (this.state.isLoading) return <Loading />
    else
      return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="text" 
                  name="name"  
                  id="name"
                  onChange={this.onNameChange}
                  />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email"  
                  id="email"
                  onChange={this.onEmailChange}
                  />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password"
                  onChange={this.onPasswordChange}
                  />
              </div>
            </fieldset>
            <div className="">
              <input 
              onClick={this.onSubmitRegister}
              className="f5 grow bg-transparent br-pill ba b--black ph4 pv2" 
              type="submit" 
              value="Done"
              />
            </div>
          </div>
        </main>
      </article>
      );
  }
}

export default Register;