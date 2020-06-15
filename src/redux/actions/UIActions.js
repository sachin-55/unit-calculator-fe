const { OPEN_CREATE_COLLECTION, CLOSE_CREATE_COLLECTION, OPEN_CREATE_SUBMETER, CLOSE_CREATE_SUBMETER } = require("../constants/UIConstants")

const openCreateCollection = ()=>(dispatch)=>{
    dispatch({
        type:OPEN_CREATE_COLLECTION
    })
}

const closeCreateCollection = ()=>(dispatch)=>{
    dispatch({
        type:CLOSE_CREATE_COLLECTION
    })
}

const openCreateSubmeter = ()=>(dispatch)=>{
    dispatch({
        type:OPEN_CREATE_SUBMETER
    })
}

const closeCreateSubmeter = ()=>(dispatch)=>{
    dispatch({
        type:CLOSE_CREATE_SUBMETER
    })
}

export {openCreateCollection,closeCreateCollection,openCreateSubmeter,closeCreateSubmeter}