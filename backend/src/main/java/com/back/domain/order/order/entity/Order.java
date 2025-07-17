package com.back.domain.order.order.entity;

import com.back.domain.order.orderItem.entity.OrderItem;
import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.CascadeType.PERSIST;
import static jakarta.persistence.CascadeType.REMOVE;
import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "product_orders")
public class Order extends BaseEntity {
    private int userId;
    private int orderNum;
    private String address;

    // Table 어노테이션 사용했으니 mappedBy 어노테이션이 작동하지 않거나, 오류 발생 가능성 있음
    @OneToMany(mappedBy = "order", fetch = LAZY, cascade = {PERSIST, REMOVE}, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    public Order(int userId, int orderNum, String address) {
        this.userId = userId;
        this.orderNum = orderNum;
        this.address = address;
    }
}
