export function currency(money) {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function changeDateStyle(date) {
  return new Date(date * 1000).toLocaleDateString();
}
