var DashboardModal = React.createClass({

	render: function() {

		var button_list = [];

		var plotId = getDashboardOptionIds(), plotType = getDashboardOptionType(), plotTime = getDashboardOptionTime();
		var count = plotId.length;

		var button_style = {
			"width": "100%"
		};

		if (count == 0) {
			return (
				<Modal {...this.props} title="Dashboard">
					<div className='modal-body'>

						No analysis done yet!!!

					</div>
					<div className='modal-footer'>
						<Button onClick={this.handleClick}>Submit</Button>
					</div>
				</Modal>
			);
		}

		for(var i = 1; i <= count; i = i + 1){
			button_list.push(<Button style = {button_style} onClick={this.handleClick.bind(this, plotId[i-1])} value={plotId[i-1]}>{plotType[i-1] + ' ' + plotTime[i-1]}</Button>);
		}

		return (
			<Modal {...this.props} title="Dashboard">
				<div className='modal-body'>
					{button_list}

				</div>
			</Modal>
		);
	},

  handleClick: function(id) {

    this.props.onRequestHide();
		if (this.refs.dashboardId == null){
				this.props.onClick(this);
		}
		else
			this.props.onClick(this, id);
  }
});
