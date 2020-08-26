function OrderItem(title, brand, color, count, unitCost, totalCost, totalSale){
    this.title = title;
    this.brand= brand;
    this.color = color;
    this.count = count;
    this.unitCost= unitCost;
    this.totalCost = totalCost;
    this.totalSale = totalSale;
}

module.exports = OrderItem;