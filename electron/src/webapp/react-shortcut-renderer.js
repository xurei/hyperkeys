const React = require ("react");

var View = React.createClass({
	propTypes: {
		shortcut: React.PropTypes.string.isRequired
	},
	
	render: function() {
		var shortcut = this.props.shortcut;
		
		var i = 0;
		var keys = shortcut.split('+').map((k) => {
			++i;
			return (<span key={i}>&nbsp;<span className="btn btn-default">{k.toUpperCase()}</span></span>)
		});
		
		return (
				<span>
					{keys}
				</span>
		);
	}
});

module.exports = View;