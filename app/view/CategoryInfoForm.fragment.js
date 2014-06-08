(function() {
  sap.ui.jsfragment("com.mitsuruog.openui5.odata.view.CategoryInfoForm", {
    createContent: function(oController) {
      var form, grid;
      form = new sap.ui.layout.form.SimpleForm({
        minWidth: 1024,
        maxContainerCols: 2,
        editable: false,
        layout: "ResponsiveGridLayout",
        title: "{i18n>categoryInfo}",
        labelSpanL: 3,
        labelSpanM: 3,
        emptySpanL: 4,
        emptySpanM: 4,
        columnsL: 1,
        columnsM: 1,
        content: [
          new sap.m.Label({
            text: "{i18n>categoryInfoID}"
          }), new sap.m.Text({
            text: "{ID}"
          }), new sap.m.Label({
            text: "{i18n>categoryInfoName}"
          }), new sap.m.Text({
            text: "{Address/Name}"
          })
        ]
      });
      grid = new sap.ui.layout.Grid({
        defaultSpan: "L12 M12 S12",
        width: "auto",
        content: [form]
      });
      return grid;
    }
  });

}).call(this);
