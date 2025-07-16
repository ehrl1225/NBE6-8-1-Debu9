package com.back.domain.order.order.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Order extends BaseEntity {
    int userId;
    int orderNum;
    String address;
    String deliveryState;

    public Order(int userId, int orderNum, String address, String deliveryState) {
        this.userId = userId;
        this.orderNum = orderNum;
        this.address = address;
        this.deliveryState = deliveryState;
    }
}
