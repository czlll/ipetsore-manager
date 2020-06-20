import http from '../utils/http'

/**
 *  @param '/manager'代表vue-cil中config，index.js中配置的代理
 */

//获取product列表
export function getProducts(categoryIdList=[],name=null,pageNum=1, pageSize=6) {
  let url = "manager/products";
  let sign = false;
  if(categoryIdList.length > 0){
    let cateStr = categoryIdList.join(',');
    if(sign)
      url = url + '&categoryIdList=' + cateStr;
    else
      url = url + '?categoryIdList=' + cateStr;
    sign = true;
  }
  if(name){
    if(sign)
      url = url + '&name=' + name;
    else
      url = url + '?name=' + name;
    sign = true;
  }
  if(pageNum != 1){
    if(sign)
      url = url + '&pageNum=' + pageNum.toString();
    else
      url = url + '?pageNum=' + pageNum.toString();
    sign = true;
  }
  console.log(url)
  return  http.get(url)
}

//新增product
export function addProduct(product){
  let url = "manager/products";
  var img = product.imgUrl;
  console.log(url)
  return  http.post(url,{...product,img})
}

//删除product
export function deleteProduct(productId){
  let url = "manager/products" + '/' + productId;
  console.log(url)
  return  http.delete(url)
}

//获取product下面的item信息
export function getProductDetail(productId){
  let url = "manager/products" + '/' + productId;
  return  http.get(url)
}

//修改product
export function updateProduct(product){
  let url = "manager/products/" + product.productId;
  console.log(url)
  return  http.put(url,product)
}

//修改Item的库存
export function updateItemQuantity(itemId,qty){
  let url = "manager/products/items/" + itemId + '?qty=' + qty;
  console.log(url)
  return  http.patch(url)
}

//删除Item
export function deleteItem(itemId){
  let url = "manager/products/items/" + itemId;
  console.log(url)
  return  http.delete(url)
}

//新增Item
export function addItem(item){
  let url = "manager/products/items";
  console.log(url)
  return  http.delete(url,item)
}
