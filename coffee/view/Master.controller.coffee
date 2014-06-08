jQuery.sap.require "com.mitsuruog.openui5.odata.util.Controller"

com.mitsuruog.openui5.odata.util.Controller.extend "com.mitsuruog.openui5.odata.view.Master",

  onInit: ->
    #[MEMO]phoneの場合はこの画面を表示する必要がないでしょ・・・っていう設計コンセプトみたい
    return if sap.ui.Device.system.phone

    @getRouter().attachRouteMatched @onRouteMatched, @

  onRouteMatched: (evt, param) ->
    unless evt.getParameter("name") is "Master"
      return

    #Desktopサイズの場合はDetailViewをロードする
    @getRouter().myNavToWithoutHash @getView(), "com.mitsuruog.openui5.odata.view.Detail"

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

