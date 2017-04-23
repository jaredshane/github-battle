const React = require('react')
const PropTypes = require('prop-types')

let PlayerPreview = (props) => {
  return (
    <div>
      <div className='column'>
        <img className='avatar' src={props.avatar} alt={'Avatar for ' + props.username} />
        <h2 className='username'> @{props.username}</h2>
      </div>
      {props.children}
    </div>

  )
}

PlayerPreview.proptypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

module.exports = PlayerPreview
