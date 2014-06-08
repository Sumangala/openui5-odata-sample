(function() {
  jQuery.sap.require("com.mitsuruog.openui5.odata.Router");

  jQuery.sap.declare("com.mitsuruog.openui5.odata.Component");

  sap.ui.core.UIComponent.extend("com.mitsuruog.openui5.odata.Component", {
    metadata: {
      name: "sapui5 best practices",
      version: "1.0",
      includes: [],
      dependencies: {
        libs: ["sap.m", "sap.ui.layout"],
        components: []
      },
      rootView: {
        type: "JS",
        viewName: "com.mitsuruog.openui5.odata.view.App"
      },
      config: {
        resourceBundle: "i18n/messageBundle.properties",
        serviceConfig: {
          name: "Northwind",
          serviceUrl: "/V2/(S(mitsuruogodata))/OData/OData.svc/"
        }
      },
      routing: {
        config: {
          routerClass: com.mitsuruog.openui5.odata.Router,
          viewType: "JS",
          viewPath: "com.mitsuruog.openui5.odata.view",
          targetControl: "appConteiner",
          targetAggregation: "detailPages",
          clearTarget: false,
          transition: "slide"
        },
        routes: [
          {
            pattern: "",
            name: "main",
            view: "Master",
            targetAggregation: "masterPages",
            subroutes: [
              {
                pattern: "{product}/:tab:",
                name: "product",
                view: "Detail"
              }
            ]
          }, {
            name: "notfoundMaster",
            view: "Master",
            targetAggregation: "masterPages",
            subroutes: [
              {
                pattern: ":all*:",
                name: "notfound",
                view: "NotFound"
              }
            ]
          }
        ]
      }
    },
    init: function() {
      var config, deviceModel, domainModel, i18nModel, rootPath, serviceUrl;
      sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
      config = this.getMetadata().getConfig();
      rootPath = jQuery.sap.getModulePath("com.mitsuruog.openui5.odata");
      i18nModel = new sap.ui.model.resource.ResourceModel({
        bundleUrl: [rootPath, config.resourceBundle].join("/")
      });
      this.setModel(i18nModel, "i18n");
      serviceUrl = config.serviceConfig.serviceUrl;
      domainModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
      this.setModel(domainModel);
      deviceModel = new sap.ui.model.json.JSONModel({
        isTouch: sap.ui.Device.support.touch,
        isNoTouch: !sap.ui.Device.support.touch,
        isPhone: sap.ui.Device.system.phone,
        isNoPhone: !sap.ui.Device.system.phone,
        listMode: sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
        listItemType: sap.ui.Device.system.phone ? "Active" : "Inactive"
      });
      deviceModel.setDefaultBindingMode("OneWay");
      this.setModel(deviceModel, "device");
      return this.getRouter().initialize();
    }
  });

}).call(this);
