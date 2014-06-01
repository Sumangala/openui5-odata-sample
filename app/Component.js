(function() {
  jQuery.sap.declare("com.mitsuruog.openui5.odata.Component");

  sap.ui.core.UIComponent.extend("com.mitsuruog.openui5.odata.Component", {
    metadata: {
      routing: {
        config: {
          viewType: "JS",
          viewPath: "view",
          targetControl: "navConteiner",
          clearTarget: false,
          transition: "slide",
          targetAggregation: "pages"
        },
        routes: [
          {
            pattern: "",
            name: "Products",
            view: "Products"
          }, {
            pattern: "product/{id}",
            name: "Product",
            view: "Product"
          }, {
            pattern: ":all*:",
            name: "NotFound",
            view: "NotFound"
          }
        ]
      }
    },
    init: function() {
      var router, url;
      jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
      sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
      router = this.getRouter();
      this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
      router.initialize();
      url = "V2/(S(xhn5u4jlacenfhxdur5bje5f))/OData/OData.svc";
      this.endpoint = new sap.ui.model.odata.ODataModel(url, true);
      return this.setModel(this.endpoint, "odata");
    },
    destroy: function() {
      if (this.routeHandler) {
        this.routeHandler.destroy();
      }
      return sap.ui.core.UIComponent.prototype.destroy.apply(this, arguments);
    },
    createContent: function() {
      var oView;
      return oView = sap.ui.view({
        id: "app",
        viewName: "view.App",
        type: "JS",
        viewData: {
          component: this
        }
      });
    }
  });

}).call(this);
