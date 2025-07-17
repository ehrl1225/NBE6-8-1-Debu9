package com.back.domain.order.order.controller;

import com.back.domain.order.order.dto.OrderDto;
import com.back.domain.order.order.entity.Order;
import com.back.domain.order.order.service.OrderService;
import com.back.domain.order.orderItem.dto.OrderItemDto;
import com.back.domain.order.orderItem.entity.OrderItem;
import com.back.global.rsData.RsData;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Tag(name = "OrderController", description = "API 주문 컨트롤러")
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    @Transactional(readOnly = true)
    @Operation(summary = "주문 다건 조회")
    public List<OrderDto> getItems() {
        List<Order> items = orderService.findAll();

        return items
                .stream()
                .map(OrderDto::new) // OrderDto로 변환
                .toList();
    }

    // id로 조회
    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    @Operation(summary = "주문 단건 조회")
    public OrderDto getItem(@PathVariable int id) {
        Order order = orderService.findById(id).get();

        return new OrderDto(order);
    }

    record OrderWriteReqBody(
            @NotNull
            int userId,
            @NotNull
            int productId,
            @NotBlank
            String address
    ) {
    }

    @PostMapping
    @Transactional
    @Operation(summary = "주문 생성")
    public RsData<OrderDto> write(@Valid @RequestBody OrderWriteReqBody reqBody) {
        Order order = orderService.write(reqBody.userId, reqBody.productId, reqBody.address);

        return new RsData<>(
                "201-1",
                "%d번 글이 작성되었습니다.".formatted(order.getId()),
                new OrderDto(order)
        );
    }

    @GetMapping("/{orderId}/delivery-schedule")
    @Transactional(readOnly = true)
    @Operation(summary = "배송일정 조회")
    public RsData<List<OrderItemDto>> getDeliverySchedule(@PathVariable int orderId) {
        List<OrderItem> orderItems = orderService.getOrderItemsByOrderId(orderId);

        List<OrderItemDto> deliverySchedule = orderItems.stream()
                .map(OrderItemDto::new)
                .toList();

        return new RsData<>(
                "200-1",
                "배송일정 조회",
                deliverySchedule
        );
    }

    @DeleteMapping("/{id}")
    @Transactional
    @Operation(summary = "주문 삭제")
    public String deleteOrder(@PathVariable int id) {
        boolean deleted = orderService.delete(id);
        if (deleted) {
            return "주문이 삭제되었습니다.";
        } else {
            return "주문을 찾을 수 없습니다.";
        }
    }

}
