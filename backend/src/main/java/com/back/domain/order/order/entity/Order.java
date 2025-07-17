package com.back.domain.order.order.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "product_orders")
public class Order extends BaseEntity {
    int userId;
    int orderNum;
    String address;

    public Order(int userId, int orderNum, String address) {
        this.userId = userId;
        this.orderNum = orderNum;
        this.address = address;
    }
}
