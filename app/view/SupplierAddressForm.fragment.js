(function() {
  sap.ui.jsfragment("com.mitsuruog.openui5.odata.view.SupplierAddressForm", {
    createContent: function(oController) {
      var form, grid;
      form = new sap.ui.layout.form.SimpleForm({
        minWidth: 1024,
        maxContainerCols: 2,
        editable: false,
        layout: "ResponsiveGridLayout",
        title: "{i18n>supplierAddress}",
        labelSpanL: 3,
        labelSpanM: 3,
        emptySpanL: 4,
        emptySpanM: 4,
        columnsL: 1,
        columnsM: 1,
        content: [
          new sap.m.Label({
            text: "{i18n>supplierAddressName}"
          }), new sap.m.Text({
            text: "{Name}"
          }), new sap.m.Label({
            text: "{i18n>supplierAddressStreet}"
          }), new sap.m.Text({
            text: "{Address/Street}"
          }), new sap.m.Label({
            text: "{i18n>supplierAddressCity}"
          }), new sap.m.Text({
            text: "{Address/City}"
          }), new sap.m.Label({
            text: "{i18n>supplierAddressZIPCode}"
          }), new sap.m.Text({
            text: "{Address/ZipCode}"
          }), new sap.m.Label({
            text: "{i18n>supplierAddressCountry}"
          }), new sap.m.Text({
            text: "{Address/Country}"
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
