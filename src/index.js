import sync from './components/sync'
sync()
import(/*webpackChunkName:  "async-banner" */'./components/async').then( _=> {
    _.async.init()
    _.isArrayFn([1,23,4,5])
})
console.log('架构师启蒙课第一课！')
