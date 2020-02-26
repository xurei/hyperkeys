import React from 'react'; //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'; //eslint-disable-line no-unused-vars
import deepEqual from 'deep-eql';
import autobind from 'autobind-decorator';
import ShortcutsList from './react-shortcuts-list';

import { ListGroup, ListGroupItem } from 'reactstrap';

class MacrosListItem extends React.Component {
	static propTypes = {
		macro: PropTypes.object.isRequired,
		metadata: PropTypes.object.isRequired,
		onRemoveMacro: PropTypes.func.isRequired,
		onMacroConfig: PropTypes.func.isRequired,
	};
	
	constructor(props) {
		super(props);
		this.state = {
			detailsVisible: true,
		};
	}
	
	render() {
		let macro = this.props.macro;
		let metadata = this.props.metadata;
		
		console.log(macro);
		
		let me = this;
		
		return (
			<ListGroupItem>
				<div onClick={this.handleToggleDetails} style={{cursor:"pointer"}}>
					<span style={{lineHeight:"45px"}}>{this.state.detailsVisible ? "−":"+"} {macro.title}</span>
					<span className="pull-right">
						{(metadata.configScreen && metadata.configScreen.enabled) && (
							<span className="btn btn-default" onClick={(e) => { e.stopPropagation(); me.props.onMacroConfig(macro.id); }}>
								<i className="fa fa-cog" aria-hidden="true"/>
							</span>
						)}
						&nbsp;
						<span className="btn btn-danger" onClick={(e) => { e.stopPropagation(); if (confirm('Remove macro ?')) me.props.onRemoveMacro(macro.id); }}>&times;</span>
					</span>
				</div>
				{this.state.detailsVisible ?
					<div style={{marginTop: "10px"}}>
						<ShortcutsList id_macro={macro.id} shortcuts={macro.shortcuts} metadatas={metadata.actions}/>
					</div> : <span/>}
			</ListGroupItem>
		);
	}
	
	@autobind
	handleToggleDetails(e) {
		this.setState({detailsVisible: !this.state.detailsVisible});
	}
	
	shouldComponentUpdate(nextProps, nextState) {
	    return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState);
	}
}

export { MacrosListItem };

class MacrosList extends React.Component {
	static propTypes = {
		macros: PropTypes.array.isRequired,
		metadatas: PropTypes.object.isRequired,
		onRemoveMacro: PropTypes.func.isRequired,
		onMacroConfig: PropTypes.func.isRequired,
	};
	
	render() {
		let macros = this.props.macros;
		
		let shortcuts = macros.map((macro) => {
			return (
				<MacrosListItem key={"macro_"+macro.id} macro={macro} metadata={this.props.metadatas[macro.name]}
				                onRemoveMacro={this.props.onRemoveMacro} onMacroConfig={this.props.onMacroConfig}/>
			);
		});
		
		return (
			<ListGroup>
				{shortcuts}
			</ListGroup>
		);
	}
	
	shouldComponentUpdate(nextProps) {
		return !deepEqual(this.props, nextProps);
	}
}

export default MacrosList;
