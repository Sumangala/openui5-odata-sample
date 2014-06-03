(function() {
  sap.ui.jsview("view.Product", {
    getControllerName: function() {
      return "view.Product";
    },
    createContent: function(oController) {
      var footer, header;
      this.page = new sap.m.Page({
        id: "fragConteiner",
        title: "商品詳細",
        showNavButton: true,
        navButtonPress: [oController.backToProducts, oController]
      });
      header = new sap.m.Button({
        text: "編集",
        press: [oController.handlePressEdit, oController],
        type: sap.m.ButtonType.Accept
      });
      footer = new sap.m.Bar({
        contentLeft: [
          new sap.m.Button({
            text: "削除",
            press: [oController.handlePressDelete, oController],
            type: sap.m.ButtonType.Reject
          })
        ]
      });
      this.page.addHeaderContent(header);
      this.page.setFooter(footer);
      return this.page;
    }
  });

}).call(this);
