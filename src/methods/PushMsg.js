import emitter from '@/methods/emitter'

export function status200(title) {
  emitter.emit('push-message', {
    style: 'success',
    title: title,
  })
}

export function status404(res, title) {
  const messages = []
  Object.values(res.data.message).forEach((item) => {
    if (item === ' title 欄位為必填') {
      item = '名稱或標題'
      messages.push(item)
    }
    if (item === ' category 欄位為必填') {
      item = '類別'
      messages.push(item)
    }
    if (item === ' unit 欄位為必填') {
      item = '單位'
      messages.push(item)
    }
    if (item === ' origin_price 欄位為必填') {
      item = '原價'
      messages.push(item)
    }
    if (item === ' price 欄位為必填') {
      item = '售價'
      messages.push(item)
    }
    if (item === ' code 欄位為必填') {
      item = '折扣碼'
      messages.push(item)
    }
    if (item === ' percent 欄位為必填') {
      item = '總金額折扣％'
      messages.push(item)
    }
    if (item === ' due_date 欄位為必填') {
      item = '使用期限'
      messages.push(item)
    }
    if (item === ' is_enabled 欄位為必填') {
      item = '啟用'
      messages.push(item)
    }
    if (item === 'code 屬性不得為空') {
      item = '折扣碼'
      messages.push(item)
    }
    if (item === 'percent 屬性不得為空') {
      item = '總金額折扣％'
      messages.push(item)
    }
    if (item === 'due_date 屬性不得為空') {
      item = '使用期限'
      messages.push(item)
    }
    if (item === 'due_date 型別錯誤') {
      item = '使用期限'
      messages.push(item)
    }
    if (item === 'title 屬性不得為空') {
      item = '名稱或標題'
      messages.push(item)
    }
    if (item === 'unit 屬性不得為空') {
      item = '單位'
      messages.push(item)
    }
    if (item === 'origin_price 屬性不得為空') {
      item = '原價'
      messages.push(item)
    }
    if (item === 'price 屬性不得為空') {
      item = '售價'
      messages.push(item)
    }
    if (item === 'category 型別錯誤') {
      item = '類別'
      messages.push(item)
    }
    if (item === 'content 屬性不得為空') {
      item = '問題解答'
      messages.push(item)
    }
    if (item === 'author 屬性不得為空') {
      item = '發布者'
      messages.push(item)
    }
    if (item === ' author 欄位為必填') {
      item = '發布者'
      messages.push(item)
    }
    if (item === ' content 欄位為必填') {
      item = '問題解答'
      messages.push(item)
    }
    if (item === ' isPublic 欄位為必填') {
      item = '公開此問答'
      messages.push(item)
    }
  })
  emitter.emit('push-message', {
    style: 'failure',
    title: title,
    content: messages.join('、'),
  })
}
