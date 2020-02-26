import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars

class Popup extends React.Component {
	static propTypes = {
		visible: PropTypes.bool,
		onClose: PropTypes.func.isRequired,
		maxWidth: PropTypes.string,
		maxHeight: PropTypes.string,
	};
	static defaultProps = {
		visible: true,
		maxWidth: '500px',
		maxHeight: '350px',
	};
	
	render() {
		//TODO allow to not have an height. This can be done by removing some absolute positions if maxHeight is not set
		
		const props = this.props;
		
		return (
			<div style={{position:"fixed", left:0,right:0,top:0,bottom:0, background:"rgba(0,0,0,0.2)", zIndex:1000, display: (props.visible ? "block":"none")}}>
				<div style={{position:"absolute", width:"100%", height:"100%", maxWidth:props.maxWidth, maxHeight:props.maxHeight, background:"#111111", top: '50%', left: '50%', transform: 'translate(-50%,-50%)', boxShadow: "#000 0 0 25px", overflow:"hidden"}}>
					<div style={{height: "2.6em", position:"fixed", width: "100%", background: "#222", padding: "0 8px"}}>
						<span style={{position: "absolute", display:"inline-block", height:"inherit", right: "10px", fontSize:"1.8em", color:"#fff", textDecoration:"none", cursor:"pointer"}} onClick={props.onClose}>&times;</span>
						<h4>{props.title}</h4>
					</div>
					<div style={{position: "absolute", top:"2.6em", bottom:"0", width: "100%", overflow:"auto", padding:"8px"}}>
						{props.children}
					</div>
				</div>
			</div>
		);
	}
}

export default Popup;
