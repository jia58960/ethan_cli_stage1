import {
    isArray
} from 'lodash-es'
import item from '../sync/sync.css'
const isArrayFn = (args) => {
    console.log(isArray(args))
}
const async = {
    init() {
        console.log('这是一个被异步加载了的组件，看network请求，它是被单独加载了的')
        fetch('/api/test')
            .then(response => response.json())
            .then(data => {
                debugger
                console.log('DevServer结果：' + data.msg)
            })
            .catch(err => {
                console.log('吃个🍎稍作休息~' + err)
            })
        setTimeout(() => {
            document.getElementById('app').innerHTML = `<h1 class="${item.test}">hello ethan!</h1>`
        }, 1000)
    }
}

export {
    async,
    isArrayFn
}