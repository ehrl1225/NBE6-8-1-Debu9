package com.back.domain.order.orderItem.dto;

import com.back.domain.order.orderItem.entity.OrderItem;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

public record OrderItemDto(
        int id,
        LocalDateTime createDate,
        LocalDateTime modifyDate,
        int orderId,
        int productId,
        int count,
        LocalDateTime expectedDeliveryDate,
        String deliveryState

) {
    public OrderItemDto(OrderItem orderItem) {
        this(
                orderItem.getId(),
                orderItem.getCreateDate(),
                orderItem.getModifyDate(),
                orderItem.getOrderId(),
                orderItem.getProductId(),
                orderItem.getCount(),
                orderItem.getExpectedDeliveryDate(),
                orderItem.getDeliveryState()
        );
    }

}
