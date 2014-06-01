(function() {
  sap.ui.jsview("view.Product", {
    getControllerName: function() {
      return "view.Product";
    },
    createContent: function(oController) {
      this.page = new sap.m.Page({
        title: "商品"
      });
      return this.page;
    }
  });

}).call(this);
