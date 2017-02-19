const React = require('./react');
const ShortcutsList = require('./react-shortcuts-list');

import { ListGroup, ListGroupItem } from 'react-bootstrap';

let MacrosListItem = React.createClass({
	propTypes: {
		macro: React.PropTypes.object.isRequired,
		metadata: React.PropTypes.object.isRequired,
		onRemoveMacro: React.PropTypes.func.isRequired,
	},
	getInitialState: () => ({
		detailsVisible: true
	}),
	
	toggleDetails: function(e) {
		this.setState({detailsVisible: !this.state.detailsVisible});
	},
	
	handleDelete: function(e) {
		this.props.onRemoveMacro(e.target.id_macro);
	},
	
	render: function() {
		let macro = this.props.macro;
		let metadata = this.props.metadata;
		
		let me = this;
		
		return (
				<ListGroupItem>
					<div onClick={this.toggleDetails} style={{cursor:"pointer"}}>
						<span style={{lineHeight:"45px"}}>{this.state.detailsVisible ? "−":"+"} {metadata.title}</span>
						<span className="pull-right">
							<span className="btn btn-default">⚙</span>&nbsp;
							<span className="btn btn-danger" onClick={(e) => { e.stopPropagation(); if (confirm('Remove macro ?')) me.props.onRemoveMacro(macro.id) }}>&times;</span>
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
	},
	
	render: function() {
		let macros = this.props.macros;
		
		let shortcuts = macros.map((macro) => {
			return (
				<MacrosListItem key={"macro_"+macro.id} macro={macro} metadata={this.props.metadatas[macro.name]} onRemoveMacro={this.props.onRemoveMacro} />
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