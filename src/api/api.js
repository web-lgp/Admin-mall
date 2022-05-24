import request from '@/utils/request'
//商品列表
export function getGoodsList(pageNum,pageSize){
    return request({
        url:`commodity/service/findall/${pageNum}/${pageSize}`,
        method:'get'
    })
}
export function login(form){
    return request({
        url:'admin/service/login',
        method:'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data:form
    })
}
export function getGoodskey(name,pageNum,pageSize){
    return request({
        url:`commodity/service/selectByKey/${name}/${pageNum}/${pageSize}`,
        method:"get"
    })
}
export function insertComm(from){
    return request({
        url:`commodity/service/insertCommodity/${from.imageUrl}/${from.name}/${from.price}/${from.desc}`,
        method:"get"
    })
}
export function selectById(id){
    return request({
        url:`commodity/service/selectByIdCommodity/${id}`,
        method:"get"
    })
}
export function updateComm(from,id){
    return request({
        url:`commodity/service/updateComm/${id}/${from.imageUrl}/${from.name}/${from.price}/${from.desc}`,
        method:"get",
        headers: {
            'Content-Type': 'text/html; charset=utf-8'
        },

    })
}
export function count(){
    return request({
        url:"/count/service/count",
        method:"get"
    })
}
export function countSite(site){
    return request({
        url:`count/service/countSit/${site}`,
        method:"get"
    })
}