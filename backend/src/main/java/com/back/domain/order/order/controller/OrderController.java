package com.back.domain.order.order.controller;

import com.back.domain.order.order.dto.OrderDto;
import com.back.domain.order.order.entity.Order;
import com.back.domain.order.order.service.OrderService;
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

    record OrderWriteReqBody(
            @NotNull
            int userId,
            @NotNull
            int productId,
            @NotBlank
            String address,
            @NotBlank
            String deliveryState
    ) {
    }

    @PostMapping
    @Transactional
    @Operation(summary = "주문 생성")
    public RsData<OrderDto> write(@Valid @RequestBody OrderWriteReqBody reqBody) {
        Order order = orderService.write(reqBody.userId, reqBody.productId, reqBody.address, reqBody.deliveryState);

        return new RsData<>(
                "201-1",
                "%d번 글이 작성되었습니다.".formatted(order.getId()),
                new OrderDto(order)
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

