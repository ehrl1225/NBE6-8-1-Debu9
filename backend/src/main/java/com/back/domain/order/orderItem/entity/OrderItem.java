package com.back.domain.order.orderItem.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class OrderItem extends BaseEntity {
    private int orderId;
    private int productId;
    private int count;

    public OrderItem(int orderId, int productId, int count) {
        this.orderId = orderId;
        this.productId = productId;
        this.count = count;
    }
}
