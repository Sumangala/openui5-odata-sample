jQuery.sap.declare "com.mitsuruog.openui5.odata.Component"

sap.ui.core.UIComponent.extend "com.mitsuruog.openui5.odata.Component",
  metadata: 
    routing:
      config:
        viewType: "JS"
        viewPath: "view"
        targetControl: "navConteiner"
        clearTarget: false
        transition: "slide"
        targetAggregation: "pages"
      routes: [{
        pattern: ""
        name: "Products"
        view: "Products"
      }, {
        pattern: "product/{id}"
        name: "Product"
        view: "Product"
      }, {
        pattern: ":all*:"
        name: "NotFound"
        view: "NotFound"     
      }]

  init: ->
    jQuery.sap.require "sap.m.routing.RouteMatchedHandler"

    # 継承元のinitを呼び出す
    sap.ui.core.UIComponent.prototype.init.apply @, arguments

    router = @getRouter()

    # routerを初期化
    @routeHandler = new sap.m.routing.RouteMatchedHandler router
    router.initialize()

    # Odata endpoint設定
    # http://services.odata.org/V3/Northwind/Northwind.svc/
    # http://services.odata.org/V3/(S(xhn5u4jlacenfhxdur5bje5f))/OData/OData.svc/
    url = "V2/(S(xhn5u4jlacenfhxdur5bje5f))/OData/OData.svc"
    @endpoint = new sap.ui.model.odata.ODataModel url, true
    @setModel @endpoint, "odata"

  destroy: ->
    if @routeHandler
      @routeHandler.destroy()

    # 継承元のdestoryを呼び出す
    sap.ui.core.UIComponent.prototype.destroy.apply @, arguments

  createContent: ->
    oView = sap.ui.view
      id: "app"
      viewName: "view.App"
      type: "JS"
      viewData: 
        component: @