import emitter from "@/methods/emitter";

export function status200(res, title) {
  if (res.data.success) {
    emitter.emit("push-message", {
      style: "success",
      title: title,
    });
  } else {
    const msg = [];
    Object.values(res.data.message).forEach((item) => {
      if (item === " title 欄位為必填") {
        item = "名稱";
        msg.push(item);
      }
      if (item === " category 欄位為必填") {
        item = "類別";
        msg.push(item);
      }
      if (item === " unit 欄位為必填") {
        item = "單位";
        msg.push(item);
      }
      if (item === " origin_price 欄位為必填") {
        item = "原價";
        msg.push(item);
      }
      if (item === " price 欄位為必填") {
        item = "售價";
        msg.push(item);
      }
      if (item === " code 欄位為必填") {
        item = "折扣碼";
        msg.push(item);
      }
      if (item === " percent 欄位為必填") {
        item = "總金額折扣％";
        msg.push(item);
      }
      if (item === " due_date 欄位為必填") {
        item = "使用期限";
        msg.push(item);
      }
      if (item === " is_enabled 欄位為必填") {
        item = "啟用";
        msg.push(item);
      }
      if (item === "code 屬性不得為空") {
        item = "折扣碼";
        msg.push(item);
      }
      if (item === "percent 屬性不得為空") {
        item = "總金額折扣％";
        msg.push(item);
      }
      if (item === "due_date 屬性不得為空") {
        item = "使用期限";
        msg.push(item);
      }
      if (item === "due_date 型別錯誤") {
        item = "使用期限";
        msg.push(item);
      }
      if (item === "title 屬性不得為空") {
        item = "名稱";
        msg.push(item);
      }
      if (item === "unit 屬性不得為空") {
        item = "單位";
        msg.push(item);
      }
      if (item === "origin_price 屬性不得為空") {
        item = "原價";
        msg.push(item);
      }
      if (item === "price 屬性不得為空") {
        item = "售價";
        msg.push(item);
      }
      if (item === "category 型別錯誤") {
        item = "類別";
        msg.push(item);
      }
    });
    emitter.emit("push-message", {
      style: "failure",
      title: title,
      content: msg.join("、"),
    });
  }
}

export function status404(msg) {
  emitter.emit("push-message", {
    style: "failure",
    title: msg,
  });
}
