const React = require('./react');
const ShortcutsList = require('./react-shortcuts-list');

import { ListGroup, ListGroupItem } from 'react-bootstrap';

let MacrosListItem = React.createClass({
	propTypes: {
		macro: React.PropTypes.object.isRequired,
		metadata: React.PropTypes.object.isRequired,
		onRemoveMacro: React.PropTypes.func.isRequired,
		onMacroConfig: React.PropTypes.func.isRequired,
	},
	getInitialState: () => ({
		detailsVisible: true
	}),
	
	toggleDetails: function(e) {
		this.setState({detailsVisible: !this.state.detailsVisible});
	},
	
	render: function() {
		let macro = this.props.macro;
		let metadata = this.props.metadata;
		
		console.log(macro);
		
		let me = this;
		
		return (
				<ListGroupItem>
					<div onClick={this.toggleDetails} style={{cursor:"pointer"}}>
						<span style={{lineHeight:"45px"}}>{this.state.detailsVisible ? "−":"+"} {macro.title}</span>
						<span className="pull-right">
							{
								(metadata.configScreen && metadata.configScreen.enabled)
								? (<span className="btn btn-default" onClick={(e) => { e.stopPropagation(); me.props.onMacroConfig(macro.id); }}>
									<i className="fa fa-cog" aria-hidden="true"/>
								</span>)
								: (<span/>)
							}
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
});

let MacrosList = React.createClass({
	propTypes: {
		macros: React.PropTypes.array.isRequired,
		metadatas: React.PropTypes.object.isRequired,
		onRemoveMacro: React.PropTypes.func.isRequired,
		onMacroConfig: React.PropTypes.func.isRequired,
	},
	
	render: function() {
		let macros = this.props.macros;
		
		let shortcuts = macros.map((macro) => {
			return (
				<MacrosListItem key={"macro_"+macro.id} macro={macro} metadata={this.props.metadatas[macro.name]} onRemoveMacro={this.props.onRemoveMacro} onMacroConfig={this.props.onMacroConfig}/>
			);
		});
		
		return (
			<ListGroup>
				{shortcuts}
			</ListGroup>
		);
	}
});

module.exports = MacrosList;