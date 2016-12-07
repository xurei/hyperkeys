const React = require ("react");

var Popup = React.createClass({
	propTypes: {
		visible: React.PropTypes.bool,
		onClose: React.PropTypes.func.isRequired,
		maxWidth: React.PropTypes.string,
		maxHeight: React.PropTypes.string,
	},
	getDefaultProps: () => ({
		visible: true,
		maxWidth: "500px",
		maxHeight: "350px"
	}),
	
	render: function() {
		//TODO allow to not have an height. This can be done by removing some absolute positions if maxHeight is not set
		
		return (
			<div style={{position:"fixed", left:0,right:0,top:0,bottom:0, background:"rgba(0,0,0,0.2)", zIndex:1000, display: (this.props.visible ? "block":"none")}}>
				<div style={{position:"absolute", width:"100%", height:"100%", maxWidth:this.props.maxWidth, maxHeight:this.props.maxHeight, background:"#111111", top: '50%', left: '50%', transform: 'translate(-50%,-50%)', boxShadow: "#000 0 0 25px", overflow:"hidden"}}>
					<div style={{height: "2.6em", position:"fixed", width: "100%", background: "#222", padding: "0 8px"}}>
						<span style={{position: "absolute", display:"inline-block", height:"inherit", right: "10px", fontSize:"1.8em", color:"#fff", textDecoration:"none", cursor:"pointer"}} onClick={this.props.onClose}>&times;</span>
						<h4>{this.props.title}</h4>
					</div>
					<div style={{position: "absolute", top:"2.6em", bottom:"0", width: "100%", overflow:"auto", padding:"8px"}}>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Popup;