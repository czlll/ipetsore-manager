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

//获取product下面的item信息
export function getProductDetail(productId){
  let url = "manager/products";
  url = url + '/' + productId;
  return  http.get(url)
}

//新增product
export function addProduct(product, file){
  let url = "manager/products";
  // url = url + '?' +
  //       'productId='+ product.productId +
  //       '&categoryId='+ product.categoryId +
  //       '&name=' + product.name +
  //       '&description=' + product.description+
  //       '&imgUrl=' + product.imgUrl;
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
