import server from './server'

/**
 * 对应后端涉及到用户认证的 API
 */
class IndexService {

  // stockOutList (productName, productNormName, sku, warehouseId, reason, orderId, name, expressCode, startDate, endDate, pageStart, pageSize) {
  //   // 入库记录列表
  //   return server({
  //     url: '/api/v1/stock/stockInList',
  //     method: 'post',
  //     data: {
  //       productName,
  //       productNormName,
  //       sku,
  //       warehouseId,
  //       reason,
  //       orderId,
  //       name,
  //       expressCode,
  //       startDate,
  //       endDate,
  //       pageStart,
  //     pageSize}
  //   })
  // }

  getInReason () {
    // 入库原因
    return server({
      url: '/api/v1/stock/getInReason',
      method: 'post',
      data: {}
    })
  }

  getOutReason () {
    // 出库原因
    return server({
      url: '/api/v1/stock/getOutReason',
      method: 'post',
      data: {}
    })
  }

  expressCompany () {
    // 获取快递信息
    return server({
      url: '/api/v1/delivery/expressCompany',
      method: 'post',
      data: {}
    })
  }

  stockInList (data) {
    // 入库记录列表
    return server({
      url: '/api/v1/stock/stockInList',
      method: 'post',
      data: data
    })
  }

  // stockOutList (productName, productNormName, sku, warehouseId, reason, orderId, name, expressCode, startDate, endDate, pageStart, pageSize) {
  //   // 出库记录列表
  //   return server({
  //     url: '/api/v1/stock/stockOutList',
  //     method: 'post',
  //     data: {
  //       productName,
  //       productNormName,
  //       sku,
  //       warehouseId,
  //       reason,
  //       orderId,
  //       name,
  //       expressCode,
  //       startDate,
  //       endDate,
  //       pageStart,
  //     pageSize}
  //   })
  // }
  stockOutList (data) {
    // 出库记录列表
    return server({
      url: '/api/v1/stock/stockOutList',
      method: 'post',
      data: data
    })
  }

  // 修改备注
  updateRemark (stockId, remark) {
    return server({
      url: '/api/v1/stock/updateRemark',
      method: 'post',
      data: {stockId,remark}
    })
  }

  exit () { // 退出
    return server({
      url: '/api/v1/login/exit',
      method: 'post',
      data: {
      }
    })
  }

  loginByPassword (account, password) { // 登录
    return server({
      url: '/api/v1/login/loginByPassword',
      method: 'post',
      data: {
      account,password}
    })
  }

  getProductsByCateId (productCateId) {
    // 出入库——根据分类id获取商品集合
    return server({
      url: '/api/v1/product/getProductsByCateId',
      method: 'post',
      data: {
      productCateId}
    })
  }

  getAttrsByProductId (productId) {
    // 出入库——根据商品id获取商品属性值集合
    return server({
      url: '/api/v1/product/getAttrsByProductId',
      method: 'post',
      data: {
      productId}
    })
  }

  deliverGood (stockId, expressType, expressCode) {
    // 发货
    return server({
      url: '/api/v1/delivery/deliverGood',
      method: 'post',
      data: {
        stockId,
        expressType,
      expressCode}
    })
  }

  deliverGoodInfo (stockId) {
    // 获取发货信息
    return server({
      url: '/api/v1/delivery/deliverGoodInfo',
      method: 'post',
      data: {
      stockId}
    })
  }

  // hasDeliverGoodsList (productName, productNormName, sku, warehouseId, reason, orderId, name, expressCode, pageStart, pageSize, opratorName, sendStartDate, sendendDate) {
  //   // 已发货
  //   return server({
  //     url: '/api/v1/delivery/hasDeliverGoodsList',
  //     method: 'post',
  //     data: {
  //     productName, productNormName, sku, warehouseId, reason, orderId, name, expressCode, pageStart, pageSize, opratorName, sendStartDate, sendendDate}
  //   })
  // }
  hasDeliverGoodsList (data) {
    // 已发货
    return server({
      url: '/api/v1/delivery/hasDeliverGoodsList',
      method: 'post',
      data: data
    })
  }

  // waitDeliverGoodsList (productName, productNormName, sku, warehouseId, reason, orderId, name, expressCode, pageStart, pageSize, opratorName, sendStartDate, sendendDate) {
  //   // 待发货
  //   return server({
  //     url: '/api/v1/delivery/waitDeliverGoodsList',
  //     method: 'post',
  //     data: {
  //     productName, productNormName, sku, warehouseId, reason, orderId, name, expressCode, pageStart, pageSize, opratorName, sendStartDate, sendendDate}
  //   })
  // }
  waitDeliverGoodsList (data) {
    // 待发货
    return server({
      url: '/api/v1/delivery/waitDeliverGoodsList',
      method: 'post',
      data: data
    })
  }

  updateProduct (sn, id) {
    // 修改商品信息
    return server({
      url: '/api/v1/product/updateProduct',
      method: 'post',
      data: {
      sn,id}
    })
  }

  // deliverGoodsList (productName, prodectNormName, sku, state, warehouseId, reason, orderId, name, expressCode, startDate, endDate, pageStart, pageSize, operatorName, sendStartDate, sendendDate) {
  //   // 全部发货列表
  //   return server({
  //     url: '/api/v1/stock/deliverGoodsList',
  //     method: 'post',
  //     data: {
  //     productName,prodectNormName,sku,state,warehouseId,reason,orderId,name,expressCode,startDate,endDate,pageStart,pageSize,operatorName,sendStartDate,sendendDate}
  //   })
  // }
  deliverGoodsList (data) {
    // 全部发货列表
    return server({
      url: '/api/v1/delivery/deliverGoodsList',
      method: 'post',
      data: data
    })
  }

  goodsIn (productGoodId, warehouseId, reason, orderId, name, phone, address, remark, sn) {
    // 入库
    return server({
      url: '/api/v1/stock/goodsIn',
      method: 'post',
      data: {
      productGoodId,warehouseId,reason,orderId,name,phone,address,remark,sn}
    })
  }

  productDetails (sn, sku, startDate, endDate, pageStart, pageSize, warehouseId, productId,productGoodsId) {
    // 获取商品明细
    return server({
      url: '/api/v1/product/productDetails',
      method: 'post',
      data: {
      sn,sku,startDate,endDate,pageStart,pageSize,warehouseId,productId,productGoodsId}
    })
  }

  goodsOut (productGoodId, warehouseId, reason, orderId, name, phone, address, remark, sn) {
    // 出库
    return server({
      url: '/api/v1/stock/goodsOut',
      method: 'post',
      data: {
      productGoodId,warehouseId,reason,orderId,name,phone,address,remark,sn}
    })
  }

  getWarehouse () {
    // 获取仓库
    return server({
      url: '/api/v1/product/getWarehouse',
      method: 'post',
      data: {
      }
    })
  }

  getChildNodeByParentId (pid) {
    // 产品分类下拉(根据父分类找子分类)
    return server({
      url: '/api/v1/product/getChildNodeByParentId',
      method: 'post',
      data: {
      pid}
    })
  }

  getproductGoodsByStockId (stockId) {
    // 出入库——查看明细(根据库存id获取货品sn)
    return server({
      url: '/api/v1/stock/getproductGoodsByStockId',
      method: 'post',
      data: {
      stockId}
    })
  }

  productGoods (productId) {
    // 获取货品信息
    return server({
      url: '/api/v1/product/productGoods',
      method: 'post',
      data: {
      productId}
    })
  }

  getProduct (name, code) {
    // 获取商品信息
    return server({
      url: '/api/v1/product/getProduct',
      method: 'post',
      data: {
      name,code}
    })
  }

  updateRemark (stockId, remark) {
    // 出入库 ——修改备注
    return server({
      url: '/api/v1/stock/updateRemark',
      method: 'post',
      data: {
      stockId,remark}
    })
  }

  getProductGood (productId, productNormAttrId) {
    // 出入库——根据商品id和属性值id获取货品
    return server({
      url: '/api/v1/product/getProductGood',
      method: 'post',
      data: {
      productId, productNormAttrId}
    })
  }

  getCateTree () {
    // 出入库 ——产品分类下拉
    return server({
      url: '/api/v1/product/getCateTree',
      method: 'post',
      data: {
      }
    })
  }
}
export default new IndexService()
