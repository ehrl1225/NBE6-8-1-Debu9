package com.back.domain.order.orderItem.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class OrderItem extends BaseEntity {
    private int orderId;
    private int productId;
    private int count;
    private LocalDateTime expectedDeliveryDate;
    private String deliveryState;

    public OrderItem(int orderId, int productId, int count, LocalDateTime expectedDeliveryDate, String deliveryState) {
        this.orderId = orderId;
        this.productId = productId;
        this.count = count;
        this.expectedDeliveryDate = expectedDeliveryDate;
        this.deliveryState = deliveryState;
    }

    public void modify(int count, LocalDateTime expectedDeliveryDate, String deliveryState) {
        this.count = count;
        this.expectedDeliveryDate = expectedDeliveryDate;
        this.deliveryState = deliveryState;
    }

}
