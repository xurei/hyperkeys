const React = require('./react');

var ShortcutRenderer = React.createClass({
	propTypes: {
		shortcut: React.PropTypes.string
	},
	
	render: function() {
		var shortcut = this.props.shortcut || "";
		
		var i = 0;
		var keys = shortcut.split('+')
		.filter((k) => k != "")
		.map((k) => {
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

module.exports = ShortcutRenderer;