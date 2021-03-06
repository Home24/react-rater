import React, { Component } from 'react';
import Star from './star';
import './react-rater.scss';

export { Star } from './star';

export default class Rater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastRating: props.rating,
      rating: props.rating,
      isRating: false
    }
  }
  componentDidMount() {
    this.setState({
      rating: this.props.rating
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      rating: nextProps.rating
    });
  }
  handleMouseEnter(e) {
    let rating = getRatingFromDOMEvent(e, this.props);
    if (rating > 0) {
      this.setState({
        rating: 0,
        isRating: true
      });
    }
  }
  handleMouseMove(e) {
    let rating = getRatingFromDOMEvent(e, this.props)
      , callback = this.props.onRate;
    if (rating > 0) {
      this.setState({
        rating: rating,
        isRating: true
      });
      callback && callback(rating);
    }
  }
  handleMouseLeave() {
    let callback = this.props.onRate
      , state = this.state;
    callback && callback(state.lastRating);
    this.setState({
      rating: state.lastRating,
      isRating: false
    })
  }
  handleClick(e) {
    let rating = getRatingFromDOMEvent(e, this.props)
      , lastRating = Number(this.state.lastRating)
      , callback = this.props.onRate;
    if (rating < 0 || e.target.getAttribute('class').indexOf('is-disabled') > -1) {
      return
    }
    this.setState({
      rating,
      lastRating: rating
    });
    callback && callback(rating, lastRating);
  }
  render() {
    let total = Number(this.props.total)
      , limit = Number(this.props.limit)
      , rating = Number(this.state.rating)
      , interactive = this.props.interactive
      , children = Array.prototype.concat(this.props.children).filter(Boolean)
      , nodes;
    limit = (this.props.limit === void 0)? total: limit;
    nodes = Array(total).join(',').split(',').map((_, i) => {
      let starProps = {
        isActive: (!this.state.isRating && i < rating),
        willBeActive: (this.state.isRating && i < rating),
        isDisabled: (i >= limit),
        key: `star-${i}`
      }
      if (children.length) {
        return React.cloneElement(children[i % children.length], starProps)
      } else {
        return (<Star {...starProps} />)
      }
    })
    if (interactive) {
      return (
        <div className="react-rater"
             onMouseEnter={this.handleMouseEnter.bind(this)}
             onMouseLeave={this.handleMouseLeave.bind(this)}
             onMouseMove={this.handleMouseMove.bind(this)}
             onClick={this.handleClick.bind(this)}
             {...this.props}>{nodes}</div>
      )
    } else {
      return (
        <div className="react-rater is-disabled" {...this.props}>{nodes}</div>
      )
    }
  }
}

Rater.defaultProps = {
  total: 5,
  rating: 0,
  interactive: true
};

function getRatingFromDOMEvent(e, props) {
  let allStars = Array.apply(null, e.currentTarget.childNodes)
    , star = findStarDOMNode(e.target, allStars, e.currentTarget)
    , index = allStars.indexOf(star)
    , rating = index + 1
    , limit = Number(props.limit);
  if (index < 0) {
    return -1
  }
  limit = (props.limit === void 0)? props.total: limit;
  rating = rating < limit? rating: limit;
  return Number(rating)
}

function findStarDOMNode(node, stars, container) {
  while(node !== container && stars.indexOf(node) === -1) {
    node = node.parentNode;
  }
  return node
}
