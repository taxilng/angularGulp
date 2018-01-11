module.exports = function GridService() {

    return {
        //全选
        girdSelectAll: function(glyphicon, gridApi) {
            if (glyphicon) {
                this.girdClearAlls(gridApi);
                glyphicon = false;
                return;
            }
            gridApi.selection.selectAllRows();
            var rows = gridApi.selection.getSelectedGridRows(); //获取所有行的结果集
            for (var i = 0; i < rows.length; i++) {
                rows[i].glyphicon = true;
            }
            glyphicon = true;
            return glyphicon;
        },
        //取消全选
        girdClearAlls: function(gridApi) {
            var rows = gridApi.selection.getSelectedGridRows(); //获取所有行的结果集
            for (var i = 0; i < rows.length; i++) {
                rows[i].glyphicon = false;
            }
            gridApi.selection.clearSelectedRows();
        },
        //点击
        girdRowSelectionChanged: function(row) {
            if (row.glyphicon) {
                row.glyphicon = false;
            } else {
                row.glyphicon = true;
            }
        }
    };
};
