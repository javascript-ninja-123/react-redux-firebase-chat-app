import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {getGeo,getName} from '../actions';
import {bindActionCreators} from 'redux'


//Component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      location: false,
      lat:'',
      lng:''
    };
    this.formCheck = this.formCheck.bind(this)
    this.geoFindMe  = this.geoFindMe.bind(this)
  }
  geoFindMe() {
    if (!navigator.geolocation) {
      console.log('location is not detected')
      return;
    }

    const success = position => {
      const latitude = position.coords.latitude,
        longitude = position.coords.longitude;
        this.props.getGeo({lat:latitude,lng:longitude})
    }
    function error(err) {
      console.warn(err)
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }
  onClick(e) {
    e.preventDefault()
    this.props.getName(this.state.text)
    let newPromise = new Promise(resolve => {
      resolve(this.setState({text: ''}));
    })
    newPromise
    .then(() => {
      this.props.history.push('/chat');
    })
  }
  onChange(e) {
    this.setState({text: e.target.value})
  }
  onChangeCheckbox() {
    this.setState({location: true})
    this.geoFindMe()
  }
  formCheck() {
    if (this.state.text.length >= 2 && this.state.text !== '') {
      return (<button type="submit" className="btn btn-sm btn-primary "
      onClick={this.onClick.bind(this)}
      >Enter the room</button>)
    }
  }
  render() {
    return (
      <div id='app'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12'>
              <h1>React RealTime Chat App</h1>
            </div>
            <div className='col-sm-12'>
              <form>
                <div className="form-group">
                  <input type="text" className="form-control" onChange={this.onChange.bind(this)} value={this.state.text} placeholder="text"/>
                </div>
                <div className='buttonDiv'>
                  {this.formCheck()}
                </div>
                <div className="checkbox">
                  <label>
                    <input type="checkbox" onChange={this.onChangeCheckbox.bind(this)}/>
                    Share my location
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({geos}) {
  return{geos}
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({getGeo,getName},dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(App)
