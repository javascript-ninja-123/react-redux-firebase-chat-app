import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchFirebase,pushFirebase} from '../actions';
import {bindActionCreators} from 'redux'
import moment from 'moment'
import LoaderExampleLoader from './loader'


class Chat extends Component {
  constructor(props){
  	super(props);
  	this.state = {text:''};
    this.renderText = this.renderText.bind(this);
  }
  componentWillMount() {
    this.props.fetchFirebase();
  }
  onChange(e){
    this.setState({text:e.target.value})
  }
  onSubmit(e){
    e.preventDefault();
    const time = moment().format('MMMM Do YYYY, h:mm:ss a');
      this.props.pushFirebase(
        {
          user:this.props.user,
          text:this.state.text,
          time,
          location:this.props.geos
        }
      )

    this.setState({text:''})
  }
  renderText(){
    return Object.values(this.props.texts)
    .filter(value => value.user)
    .map((value,index)=> {
      return <li key={index}>{value.user}--{value.text} {value.time}</li>
    })
  }
  render() {
    if (!this.props.texts && !this.props.geos) {
      return <LoaderExampleLoader/>
    }
    return (
      <div className="chat">
        <form className="form-inline" onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={this.onChange.bind(this)}
              value={this.state.text}
              placeholder="text"/>
          </div>
          <button type="submit" className="btn btn-default">Click</button>
        </form>
        <ul>
          {this.renderText()}
        </ul>
      </div>
    );
  }
}
function mapStateToProps({texts,geos,user}) {
  return {texts,geos,user}
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchFirebase,pushFirebase
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat)
