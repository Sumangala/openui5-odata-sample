jQuery.sap.require "com.mitsuruog.openui5.odata.util.Controller"
jQuery.sap.require "com.mitsuruog.openui5.odata.util.Formatter"

com.mitsuruog.openui5.odata.util.Controller.extend "com.mitsuruog.openui5.odata.view.Detail",

  onInit: ->
    @view = @getView()
    @tabs = @view.byId "tabs"
    
    @getRouter().attachRouteMatched @onRouteMatched, @

    # @initialLoadFinishedDeferred = jQuery.Deferred()
    # # if sap.ui.Device.system.phone
    #   @initialLoadFinishedDeferred.resolve()
    # else
      # @view.setBusy true
      # @getEventBus().subscribe "master", "InitialLoadFinished", @onMasterLoaded, @

  onRouteMatched: (evt, param) ->
    @routeName = evt.getParameter "name"
    @routeParameters = evt.getParameter "arguments"

    # jQuery.when(@initialLoadFinishedDeferred).then(jQuery.proxy(@_initalLoaded, @))
    @_initalLoaded()
    # unless @routeName is "product"
    #   return

    # product = @routeParameters.product
    # bindingPath = "/#{product}"

    # @view.bindElement bindingPath

    # #実際に商品データが取得できたかチェック
    # @_checkReceivedProductData(bindingPath)

    # #表示するデータを取得します
    # @_bindDisplayData()

    # #初期表示するタブを選択する
    # @_showTab()

  onTabSelect: (evt) ->
    product = evt.getSource().getBindingContext().getPath().slice 1
    tab = evt.getParameter "selectedKey"

    @getRouter().navTo "product", 
      product: product
      tab: tab
    , true

  onNavBack: (evt) ->
    @getRouter().navBack "master"

  _initalLoaded: ->
    unless @routeName is "product"
      return

    product = @routeParameters.product
    bindingPath = "/#{product}"

    @view.bindElement bindingPath

    #実際に商品データが取得できたかチェック
    @_checkReceivedProductData(bindingPath)

    #表示するデータを取得します
    @_bindDisplayData()

    #初期表示するタブを選択する
    @_showTab()

  _onMasterLoaded: ->
    @view.setBusy false    

  _checkReceivedProductData: (bindingPath) ->
    @view.getElementBinding().attachEventOnce "dataReceived", jQuery.proxy @_handleDataReceived(bindingPath), @

  _handleDataReceived: (bindingPath) ->
    odata = @view.getModel().getData bindingPath
    unless odata
      @getRouter().navToWithoutHash @view, "com.mitsuruog.openui5.odata.view.NotFound"

  _bindDisplayData: ->

    #bindElementすると以下のrequestが送信されODataが取得されます。
    #これはProductのEntitySetにNavigationPropertyが設定されているためです。
    #/OData/OData.svc/Products(2)/Supplier
    #/OData/OData.svc/Products(2)/Category
    @tabs.getItems().forEach (item) ->
      element = com.mitsuruog.openui5.odata.util.Formatter.uppercaseFirstChar item.getKey()
      item.bindElement element

  _showTab: ->

    tabKey = @routeParameters.tab or "supplier"

    #[MEMO]すでに同じタブが開かれている場合にタブの内容がクリアされてしまうための処置
    # return if @tabs.getSelectedKey() is tabKey

    if @tabs.getSelectedKey() isnt tabKey
      @tabs.setSelectedKey tabKey