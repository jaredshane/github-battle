const React = require('react')
const PropTypes = require('prop-types')

let styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
}

class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: props.text
    }
  }

  componentDidMount() {
    let stopper = this.props.text + '...'
    this.interval = window.setInterval( () => {
      if (this.state.text === stopper) {
        this.setState( () => {
          return {
            text: this.props.text
          }
        })
      } else {
        this.setState( (prevState) => {
          return {
            text: prevState.text + '.'
          }
        })
      }
    }, this.props.speed)
  }

  componentWillUnmount () {
    console.log('clear the interval')
    window.clearInterval(this.interval)
  }

  render () {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}



module.exports = Loading
