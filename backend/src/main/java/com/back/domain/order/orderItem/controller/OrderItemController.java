package com.back.domain.order.orderItem.controller;

import com.back.domain.order.order.service.OrderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders/{orderNum}/items") //
@RequiredArgsConstructor
@Tag( name = "OrderItemController", description = "API 주문 아이템 컨트롤러")
public class OrderItemController {
    private final OrderService orderService;
}
