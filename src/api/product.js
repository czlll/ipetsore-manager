import http from '../utils/http'
import axios from 'axios'

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
export function addProduct(product, file){
  let url = "manager/products";

  var formData = new FormData()
  formData.append("categoryId", product.categoryId)
  formData.append("name", product.name)
  formData.append("description", product.description)
  formData.append("img", file)
  var config = { headers: { 'Content-Type': 'multipart/form-data' } }

  return  axios.post(url, formData, config)
}

//修改product
export function updateProduct(product, file){
  var url = "manager/products/" + product.productId;

  var formData = new FormData()
  formData.append("categoryId", product.categoryId)
  formData.append("name", product.name)
  formData.append("description", product.description)
  formData.append("img", file)
  var config = { headers: { 'Content-Type': 'multipart/form-data' } }

  return  http.put(url, formData, config)
}

//获取product下面的item信息
export function getProductDetail(productId){
  let url = "manager/products" + '/' + productId;
  return  http.get(url)
}

//修改Item的库存
export function updateItemQuantity(itemId,qty){
  let url = "manager/products/items/" + itemId + '?qty=' + qty;
  console.log(url)
  return  http.patch(url)
}

//删除product
export function deleteProduct(productId){
  let url = "manager/products" + '/' + productId;
  console.log(url)
  return  http.delete(url)
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
  return  http.post(url,item)
}
