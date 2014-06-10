(function() {
  sap.ui.jsview("com.mitsuruog.openui5.odata.view.AddProduct", {
    getControllerName: function() {
      return "com.mitsuruog.openui5.odata.view.AddProduct";
    },
    createContent: function(oController) {
      var footer, form, grid;
      this.page = new sap.m.Page({
        title: "{i18n>addProductTitle}"
      });
      form = new sap.ui.layout.form.SimpleForm({
        minWidth: 800,
        maxContainerCols: 2,
        editable: true,
        layout: "ResponsiveGridLayout",
        title: "{i18n>addProductFormTitle}",
        labelSpanL: 3,
        labelSpanM: 3,
        emptySpanL: 4,
        emptySpanM: 4,
        columnsL: 1,
        columnsM: 1,
        content: [
          new sap.ui.core.Title({
            text: "{i18n>addProductTitleBasic}"
          }), new sap.m.Label({
            text: "{i18n>addProductLabelName}"
          }), new sap.m.Input, new sap.m.Label({
            text: "{i18n>addProductLabelDescription}"
          }), new sap.m.TextArea, new sap.m.Label({
            text: "{i18n>addProductLabelReleaseDate}"
          }), new sap.m.DateTimeInput({
            type: "Date"
          }), new sap.m.Label({
            text: "{i18n>addProductLabelPrice}"
          }), new sap.m.Input, new sap.m.Label({
            text: "{i18n>addProductLabelRating}"
          }), new sap.m.RatingIndicator({
            visualMode: "Full"
          }), new sap.ui.core.Title({
            text: "{i18n>addProductTitleDiscontinued}"
          }), new sap.m.Label({
            text: "{i18n>addProductLabelDiscontinuedFlag}"
          }), new sap.m.CheckBox, new sap.m.Label({
            text: "{i18n>addProductLabelDiscontinuedDate}"
          }), new sap.m.DateTimeInput({
            type: "Date"
          }), new sap.ui.core.Title({
            text: "{i18n>addProductTitleSupplierCategory}"
          }), new sap.m.Label({
            text: "{i18n>addProductLabelSupplier}"
          }), new sap.m.Select({
            items: {
              path: "/Suppliers",
              template: new sap.ui.core.Item({
                text: "{Name}"
              })
            }
          }), new sap.m.Label({
            text: "{i18n>addProductLabelCategory}"
          }), new sap.m.Select({
            items: {
              path: "/Categories",
              template: new sap.ui.core.Item({
                text: "{Name}"
              })
            }
          })
        ]
      });
      grid = new sap.ui.layout.Grid({
        defaultSpan: "L12 M12 S12",
        width: "auto",
        content: [form]
      });
      footer = new sap.m.Bar({
        contentRight: [
          new sap.m.Button({
            text: "{i18n>addProductButtonSave}",
            type: "Emphasized",
            press: [oController.onSave, oController]
          }), new sap.m.Button({
            text: "{i18n>addProductButtonCancel}",
            press: [oController.onCancel, oController]
          })
        ]
      });
      this.page.addContent(grid);
      this.page.setFooter(footer);
      return this.page;
    }
  });

}).call(this);
