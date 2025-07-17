package com.back.domain.order.order.entity;

import com.back.domain.member.member.entity.Member;
import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Random;

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
