Ext.define('RowGridEditor',{
    extend: 'Ext.grid.Panel',
    constructor: function(config) {
        config = config || {};
        this.store = Ext.create('Ext.data.Store',{
            fields:[
                {name: 'id', type: 'int'},
                {name: 'nama', type: 'string'},
                {name: 'alamat', type: 'string'},
                {name: 'tanggal_lahir', type: ''},
            ],
            proxy:{
                type:'ajax',
                url: 'http://localhost/data_siswa/biodata/tampil_data',
                actionMethods:{read: 'post'},
                reader:{
                    type:'json',
                    root:'data'
                }
            },
            autoLoad:true,
            sorters:[{
                property: 'id',
                direction: 'ASC'
            }]
        });

        Ext.applyIf(config, {
            columns: [
                Ext.create('Ext.grid.RowNumberer',{ width: 40}),
                {header: 'Id', hidden: true, dataIndex:'id', filter:{type:'string'}},
                {header: 'Name', width: 150, dataIndex:'nama', filter:{type:'string'},editor: {xtype: 'textfield'}},
                {header: 'Address', width: 150, dataIndex:'alamat', filter:{type:'string'},editor: {xtype: 'textfield'}},
                {header: 'Brith day', width: 150, dataIndex:'tanggal_lahir', filter:{type:''},editor: {xtype: 'textfield'}},
            ],
            border: true,
            selModel: Ext.create('Ext.selection.CheckboxModel'),
            columnLines: true,
            plugins: [
                Ext.create('Ext.grid.plugin.RowEditing', {
                    pluginId: 'roweditor',
                    clicksToMoveEditor: 1,
                    clickToEdit: 1,
                    listeners: {
                        scope: this,
                        cancelEdit: function(){
                            var ds = this.getStore(),
                                rs = ds.getNewRecords(),
                                i;
                            for (i = rs.length - 1; i >= 0; i--) {
                                if (rs[i].phantom === true) {
                                    ds.remove(rs[i]);
                                }
                            }
                        },
                        edit: this.doSave
                    }
                })
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: this.store,
                    displayInfo: true,
                    items: [
                        '-',
                        {
                            text: 'Add',
                            iconCls: 'addIcon',
                            scope: this,
                            handler: function(){
                                this.onAddClick()
                            }
                        },'-',
                        {
                            text: 'Edit',
                            iconCls: 'editIcon',
                            scope: this,
                            handler: function(){
                                this.onDelClick()
                            }
                        },'-',
                        {
                            text: 'Delete',
                            iconCls: 'delIcon',
                            scope: this,
                            handler: function(){
                                this.onDelClick()
                            }
                        }
                    ]
                }
            ]
        });
        this.callParent([config]);
    },
    onBoxReady: function() {
        this.callParent(arguments);
        Ext.defer(this.store.load, 500, this.store);
    },
    onAddClick: function() {
        var editor = this.getPlugin('roweditor'),
            model;
        if (editor) {
            editor.cancelEdit();
            model = this.getStore().createModel({
                Name: '',
                Address: '',
                Brith: ''
            });
            this.store.insert(0, model);
            editor.startEdit(model, 2);
        }
    },
    onDelClick: function(){

    },
    doSave: function(editor, evt) {
        var rec = evt.record,
        params = Ext.apply(rec.data);

        Ext.Ajax.request({
            url: 'http://localhost/data_siswa/simpan_data',
            params: params,
            scope: this,
            callback: function(o, s, r) {
                if (s) {
                    Ext.Msg.alert('Information', 'Record has been saved!');
                    this.getStore().reload();
                }
            }
        });
    }
})

Ext.onReady(function(){
    Ext.QuickTips.init();
    Ext.create('Ext.Window', {
        width: 1070,
        height: 400,
        border: false,
        modal: true,
        layout: 'fit',
        title: 'Grid Row Editor',
        autoShow:true,
        // autoWidth:true,
        items: Ext.create('RowGridEditor')
    });
});