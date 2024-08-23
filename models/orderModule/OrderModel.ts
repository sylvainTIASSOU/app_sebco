export class OrderModel {
        totalPrice: number;
        status: string;
        payement: string;
        deliveryId: number;
        id?: number;
        isVisible?: boolean;
        isActived?: boolean;
    
        constructor(
            totalPrice: number,
            status: string,
            payement: string,
            deliveryId: number,
            id?: number,
            isVisible?: boolean,
            isActived?: boolean
        ) {
            this.totalPrice = totalPrice;
            this.status = status;
            this.payement = payement;
            this.deliveryId = deliveryId;
            this.id = id;
            this.isActived = isActived;
            this.isVisible = isVisible;
        }
    
    
    }
     