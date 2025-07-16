package com.back.domain.order.order.controller;

import com.back.domain.order.order.service.OrderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Tag(name = "OrderController", description = "API 주문 컨트롤러")
public class OrderController {
    private final OrderService orderService;

    // 주문 삭제
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable int id) {
        boolean deleted = orderService.delete(id);
        if (deleted) {
            return "주문이 삭제되었습니다.";
        } else {
            return "주문을 찾을 수 없습니다.";
        }
    }
}
