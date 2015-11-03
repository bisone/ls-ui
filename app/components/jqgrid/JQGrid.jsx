import React from 'react';
import ReacDOM from 'react-dom';
import 'free-jqgrid/js/i18n/grid.locale-cn.js';
// import 'free-jqgrid/css/ui.jqgrid.css';
import jqGrid from 'free-jqgrid/js/jquery.jqgrid.src.js';

export default class JQGrid extends React.Component{

    constructor(props){
        super (props);
    }

    componentDidMount() {
        this.initJQueryPlugin();
    }

    initJQueryPlugin() {
        var context = this;
        this.refs.eventsgrid.jqGrid({
            datatype: "local",
            colNames: ['Title'],
            colModel: [
                { name: 'title', index: 'title', sortable: true, key: true }
            ],
            rowNum: 3,
            sortname: '',
            viewrecords: true,
            sortorder: "desc",
            caption: "",
            pager: '#eventsgridpager',
            autowidth: true,
            loadOnce: true,
            scrollOffset: false,
            height: '',
            subGrid: false,
            onSelectRow: function (rowid, status, e) {
                //Events.emit("selectRow", rowid, status, e);
            },

            loadComplete: function (maingrid_id) {
                //alert(maingrid_id);
            },

            onPaging: function (pgButton, records) {
                var nextPage = 1;

                if (pgButton.indexOf("next") != -1) {
                    nextPage = context.props.gridData.page + 1;
                }
                else {
                    nextPage = context.props.gridData.page - 1;
                }

                //Events.emit("changeGridData", {filters: {}, order: { sortname: "", sortorder: context.props.gridData.order.sortorder}, page: nextPage});
            },

            onSortCol: function (index, columnIndex, sortOrder) {
                //Events.emit("changeGridData", {filters: {}, order: { sortname: "", sortorder: sortOrder}, page: context.props.gridData.page});

                return 'stop';
            }
        });
        //this.refs.eventsgrid.addJSONData(this.props.eventsModel.attributes);
        // this.refs.eventsgrid.jqGrid('setSelection', this.props.eventModel.attributes.title, false);
        //$(element).find("#eventsgrid").jqGrid('sortGrid', 'title', false, context.props.gridData.order.sortorder); Bool not fired?¿?¿¿ -> Obrir cas a tirand!!!!!!
    }

    componentWillUpdate(){
        this.refs.eventsgrid.GridUnload();
    }

    componentDidUpdate(prevProps, prevState) {
        this.initJQueryPlugin();
    }

    componentWillUnmount(){
        this.refs.eventsgrid.GridUnload();
    }

    render () {
        return (
            <div><table ref="eventsgrid" /><div id="eventsgridpager"></div></div>
        );
    }
}
