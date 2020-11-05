// 函数组件
import React, { useState, useEffect } from 'react'
// useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
export default function FunctionComponent(props) {
  let [count, setCount] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count++)
    }, 10000)
    return () => clearInterval(timer)
  })
  return (
    <div className='top-border'>
      FunctionComponent
      {count}
    </div>
  )
}
