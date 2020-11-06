export default {
  data: function () {
    return {
      nodeTypeMap: {
        0: '根节点',
        1: '空节点',
        2: '业务员',
        3: '子渠道'
      },
      nodeOptions: [],
      nodeOptionsLevel2: [],
      list: []
    }
  },
  methods: {
    //0: '根节点',1: '空节点',2: '业务员',3: '子渠道'
    cumputeNodeList(list) {
      this.list = list
      // 跳过第index的锁定渠道,目的是编辑时用到
      let nodeObj = {}
      for (let key in this.nodeTypeMap) {
        let arr = list.reduce((group, value) => {
          if (value.nodeType == key) {
            group.push(value)
          }
          return group
        }, [])
        nodeObj[key] = arr
      }
      let root = [].concat(nodeObj[0])
      root[0].nodeName = '全部(root)'
      this.addChildrenData(root)
      this.nodeOptions = root
    },
    cumputeNodeListlevel2(list) {
      this.list = list
      // 找到所有业务员
      let arr = list.reduce((group, value) => {
        if (value.nodeType == 2) {
          group.push(value)
        }
        return group
      }, [])
      let root = [].concat(arr)
      this.addChildrenData(root)
      this.nodeOptionsLevel2 = root
    },
    cumputeChildNode(list) {
      this.list = list
      this.cumputeNodeListlevel2(list)
      // 找到所有子渠道
      let zinode = list.reduce((group, value) => {
        if (value.nodeType == 3) {
          group.push(value)
        }
        return group
      }, [])
      let arr = []
      // console.log(zinode)
      zinode.forEach((zi) => {
        let index = null
        this.nodeOptionsLevel2.forEach((fu, key) => {
          if (zi.parentNodeId == fu.id) {
            index = key
          }
        })
        if (index) {
          let funode = this.nodeOptionsLevel2.splice(index, 1)
          arr = arr.concat([...funode, zi])
        } else {
          arr.push(zi)
        }
      })
      return (
        arr.map((item) => {
          let fuNode = list.find((fu) => {
            return item.parentNodeId == fu.id
          })
          if (fuNode.nodeType == 2) {
            return {
              lable: `${item.nodeName}/${fuNode.nodeName}`,
              id: `${fuNode.id},${item.id}`
            }
          }
          return {
            lable: `${item.nodeName}`,
            id: `${item.id}`
          }
        })
      )
    },
    // 计算出  子渠道/业务员 列表
    cumputeChannelNode(list) {
      // 找到所有子渠道
      let arr = list.reduce((group, value) => {
        if (value.nodeType == 3) {
          group.push(value)
        }
        return group
      }, [])
      return (
        arr.map((item) => {
          let fuNode = list.find((fu) => {
            return item.parentNodeId == fu.id
          })
          return {
            lable: `${item.nodeName}/${fuNode.nodeName}`,
            id: `${fuNode.id},${item.id}`
          }
        })
      )
    },
    findChild(parentId, list) {
      let children = list.filter((value) => {
        return value.parentNodeId == parentId
      })
      return children || []
    },
    addChildrenData(arr) {
      let newList = [].concat(this.list)
      for (let m = 0; m < arr.length; m++) {
        let item = arr[m]
        let children = newList.filter((value) => {
          return value.parentNodeId == item.id
        })
        // 递归查找自己的下级节点
        if (children.length > 0) {
          arr[m]['children'] = children
          this.addChildrenData(arr[m]['children'])
        }
      }
    },
    groupByParentId(fuNodes, ziNodes) {
      let newList = []
      for (let k = 0; k < fuNodes.length; k++) {
        let item = fuNodes[k]
        let fuid = item.id
        let children = ziNodes.filter((value) => {
          return value.parentNodeId == fuid
        })
        item.children = children
        newList.push(item)
      }
      return newList
    }
  }
}
