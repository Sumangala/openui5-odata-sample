jQuery.sap.require "com.mitsuruog.openui5.odata.util.Controller"

com.mitsuruog.openui5.odata.util.Controller.extend "com.mitsuruog.openui5.odata.view.Master",

  onInit: ->
    #[MEMO]phoneの場合はこの画面を表示する必要がないでしょ・・・っていう設計コンセプトみたい
    return if sap.ui.Device.system.phone

    @list = @getView().byId "list"
    @getRouter().attachRouteMatched @onRouteMatched, @

    @updateFinishedDeferred = jQuery.Deferred()
    @list.attachEventOnce "updateFinished", () ->
      @updateFinishedDeferred.resolve()
    , @

  onRouteMatched: (evt, param) ->
    @routeName = evt.getParameter "name"
    @routeParameters = evt.getParameter "arguments"

    jQuery.when(@updateFinishedDeferred).then(jQuery.proxy(@_listLoaded, @))

    #Desktopサイズの場合はDetailViewをロードする
    @getRouter().navToWithoutHash @getView(), "com.mitsuruog.openui5.odata.view.Detail"

    # @waitForInitialListLoading ->
    #   this.selectFirstItem();

  onSearch: (evt) ->
    filters = []
    query = @getView().byId("query").getValue()
    list = @getView().byId("list")

    if query and query.length > 0
      filters = [
        new sap.ui.model.Filter "Name", sap.ui.model.FilterOperator.Contains, query
      ]
    binding = list.getBinding "items"
    binding.filter filters

  onItemSelect: (evt) ->
    #[MEMO]deviceModelによってListTypeが変わるので、それぞれに対応するために2つのObjectを見ている
    selectItem = evt.getParameter("listItem") or evt.getSource()
    @showDetail selectItem

  onAddProduct: (evt) ->
    @getRouter().navToWithoutHash @view, "com.mitsuruog.openui5.odata.view.AddProduct"

  showDetail: (selectItem) ->
    #[MEMO]phoneの場合のみhistoryに追加する
    isHistoryReplace = if jQuery.device.is.phone then false else true
    #[Fixme]一旦我慢。Products(1) -> product/1
    product = selectItem.getBindingContext().getPath().substr 1

    @getRouter().navTo "product", 
      from: "master"
      product: product
      tab: "supplier"
    , isHistoryReplace

  _listLoaded: ->
    switch @routeName
      when "master"
        @_selectDetail()
      when "product"
        product = @routeParameters.product
        items = @list.getItems()

        for item, i in items
          if item.getBindingContext().getPath() is "/#{product}"
            @list.setSelectedItem item, true
            break

  _selectDetail: ->
    return if sap.ui.Device.system.phone

    items = @list.getItems()
    if items.length and not @list.getSelectedItem()
        @list.setSelectedItem items[0], true
        @showDetail items[0]
