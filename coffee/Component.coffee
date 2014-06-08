jQuery.sap.require "com.mitsuruog.openui5.odata.Router"

jQuery.sap.declare "com.mitsuruog.openui5.odata.Component"

sap.ui.core.UIComponent.extend "com.mitsuruog.openui5.odata.Component",

  metadata: 
    name: "sapui5 best practices"
    version: "1.0"
    includes: []
    dependencies: 
      libs: [
        "sap.m", "sap.ui.layout"
      ]
      components: []
    #[MEMO] rootView: "com.mitsuruog.openui5.odata.view.App"とするとXMLViewになるのでHack
    rootView: 
      type: "JS"
      viewName: "com.mitsuruog.openui5.odata.view.App"
    config:
      resourceBundle: "i18n/messageBundle.properties"
      serviceConfig:
        name: "Northwind"
        serviceUrl: "/V2/(S(mitsuruogodata))/OData/OData.svc/"
    routing:
      config:
        routerClass: com.mitsuruog.openui5.odata.Router
        viewType: "JS"
        viewPath: "com.mitsuruog.openui5.odata.view"
        targetControl: "appConteiner"
        targetAggregation: "detailPages"
        clearTarget: false
        transition: "slide"
      routes: [{
        pattern: ""
        name: "main"
        view: "Master"
        targetAggregation: "masterPages"
        subroutes: [{
          pattern: "{product}/:tab:"
          name: "product"
          view: "Detail"
        }]
      }, {
        name: "notfoundMaster"
        view: "Master"
        targetAggregation: "masterPages"
        subroutes: [{
          pattern: ":all*:"
          name: "notfound"
          view: "NotFound"
        }]
      }]

  init: ->
    sap.ui.core.UIComponent.prototype.init.apply @, arguments
    config = @getMetadata().getConfig()

    #[MEMO]Componentには絶対パスを使う事。相対パスだとFiori Launchpadで落ちるらしい・・・
    rootPath = jQuery.sap.getModulePath "com.mitsuruog.openui5.odata"

    #i18n設定
    i18nModel = new sap.ui.model.resource.ResourceModel
      bundleUrl: [rootPath, config.resourceBundle].join "/"
    @setModel i18nModel, "i18n"

    #Odataのendpointを指定([MEMO]domain modelというらしい)
    serviceUrl = config.serviceConfig.serviceUrl
    domainModel = new sap.ui.model.odata.ODataModel serviceUrl, true
    @setModel domainModel

    #Device Model(なんじゃこりゃ？)
    #[MEMO]UIコントロールをレスポンシブにするための設定らしい。sap.ui.Deviceを見ろ。
    deviceModel = new sap.ui.model.json.JSONModel
      isTouch: sap.ui.Device.support.touch
      isNoTouch: not sap.ui.Device.support.touch
      isPhone: sap.ui.Device.system.phone
      isNoPhone: not sap.ui.Device.system.phone
      listMode: if sap.ui.Device.system.phone then "None" else "SingleSelectMaster"
      listItemType: if sap.ui.Device.system.phone then "Active" else "Inactive"
    deviceModel.setDefaultBindingMode "OneWay"
    @setModel deviceModel, "device"

    #router初期化
    @getRouter().initialize()
