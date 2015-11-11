/** @jsx React.DOM */
define([
    'react',
    'w2ui'
],function (React, W2ui){
    W2ui = React.createClass({

            getInitialState: function() {
                return {data: []};
            },

        handleOnExpand: function () {
            $(this.getDOMNode()).html('<div style="padding: 10px">Expanded content</div>').animate({'height': 400}, 400);
        },
        componentDidMount: function () {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                success: function(data) {
                   var searches=data.searches,
                        sortData= data.sortData,
                        columns= data.columns,
                        records=data.records;

                    $(this.getDOMNode()).w2grid({
                        name: 'grid',
                        header: '列表名称',
                        show: {
                            toolbar: true,
                            footer: true,
                            header: true,
                            lineNumbers: true,
                            selectColumn: true,
                            expandColumn: true
                        },
                        searches:searches,
                        sortData:sortData,
                        columns:columns,
                        records:records,
                        onExpand: this.handleOnExpand()

                    });
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });

        },

        render: function(){
            return (
                <div className="sonegrid" ref="w2ui" data={this.state.data}></div>
            );
        }
    });
    return W2ui;

});
