import React, { Fragment, forwardRef, useState, useEffect } from 'react';
import { Button, Card } from 'antd'
import styles from './App.css';

const conditions = [
  {
    label: '公司名字', value: 'name',
  },
  {
    label: '项目点位', value: 'point',
  }
]
const tag = 'tag'
export default forwardRef((props, ref) => {
  const [va, setVa] = useState('')
  const [range, setRange] = useState({})
  const [currentTagId, setCurrentTagId] = useState()
  const contentId = 'content'
  const selectHandler = () => {
    // 监听选定文本的变动
    let sel = window.getSelection();
    let range = sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
    if (
      range &&
      range.commonAncestorContainer.ownerDocument.activeElement.id ===
      contentId
    ) {
      setRange(range)
    }
  }
  const getId = () => {
    return `r${new Date().getTime()}d${Math.ceil(Math.random() * 1000)}`;
  }

  const addTag = (text) => {
    // 创建模版标签
    let node = document.createElement(this.tag);
    node.innerText = text;
    // 添加id便于删除
    node.id = getId();
    this.insertNode(node);
  }

  useEffect(() => {
    document.addEventListener('selectionchange', selectHandler);
    return () => {
      document.removeEventListener('selectionchange', selectHandler);
    }
  }, [])


  const handleAdd = () => {

  }

  const handleClick = (e) => {
    // 监听点击事件
    const TAG_NAME = e.target.nodeName;
    if (TAG_NAME === tag.toUpperCase()) {
      // 点击模版标签时，记录id
      setCurrentTagId(e.target.id)
      e.target.className = 'active';
    } else if (currentTagId) {
      // 清空active样式
      let target = document.getElementById(currentTagId);
      target.className = '';
      setCurrentTagId(null)
    } else {
      setCurrentTagId(null)

    }
  }

  const handleDelete = (e) => {
    // 监听“删除”事件
    if (currentTagId) {

      // 若已选中模版标签，直接删除dom节点
      let t = document.getElementById(currentTagId);
      // $refs.wTextareaContent.removeChild(t);
      setCurrentTagId(null)
      // 阻止浏览器默认的删除事件，并手动更新数据
      e.preventDefault();
    }
  }



  return (
    <Fragment>
      <Card className="App" ref={ref}>
        {conditions.map((v, index) => <Button
          key={index}
          value={v.value}
          onClick={handleAdd}
        >{v.label}</Button>)}
        <div
          id='content'
          className={styles.content}
          contentEditable
          onClick={handleClick}
          onChange={e => setVa(e.target.value)}
          onKeyDown={handleDelete}
        >
          {va}

        </div>
      </Card>
    </Fragment>
  );
})