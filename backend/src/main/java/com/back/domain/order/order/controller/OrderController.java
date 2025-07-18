package com.back.domain.order.order.controller;

import com.back.domain.member.member.entity.Member;
import com.back.domain.member.member.service.MemberService;
import com.back.domain.order.order.dto.OrderDto;
import com.back.domain.order.order.entity.Order;
import com.back.domain.order.order.service.OrderService;
import com.back.domain.order.orderItem.dto.OrderItemDto;
import com.back.domain.order.orderItem.entity.OrderItem;
import com.back.domain.order.orderItem.service.OrderItemService;
import com.back.global.rsData.RsData;
import com.back.global.util.UUIDToInt;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Tag(name = "OrderController", description = "API 주문 컨트롤러")
public class OrderController {
    private final OrderService orderService;
    private final MemberService memberService;
    private final OrderItemService orderItemService;

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

    // email로 조회
    @GetMapping("/{memberEmail}")
    @Transactional(readOnly = true)
    @Operation(summary = "이메일로 주문 조회")
    public List<OrderDto> getItems(@PathVariable String memberEmail) {
        Optional<Member> nullable_member = memberService.findByEmail(memberEmail);
        if (nullable_member.isEmpty()) {
            return List.of(); // 이메일로 회원을 찾지 못한 경우 빈 리스트 반환
        }
        Member member = nullable_member.get();
        List<Order> orders = orderService.findAll().stream()
                .filter(order -> order.getUser().getId() == member.getId())
                .toList();

        return orders.stream()
                .map(OrderDto::new)
                .toList();
    }


    record OrderItemWriteReqBody(
            @NotNull
            int productId,
            @NotNull
            int count
    ) { }

    record OrderWriteReqBody(
            @NotNull
            String email,
            @NotBlank
            String address,
            @NotNull
            List<OrderItemWriteReqBody> items
    ) {
    }


    @PostMapping
    @Transactional
    @Operation(summary = "주문 생성")
    public RsData<OrderDto> write(@Valid @RequestBody OrderWriteReqBody reqBody) {
        Optional<Member> nullable_actor = memberService.findByEmail(reqBody.email);
        Member actor = nullable_actor.orElseGet(() -> memberService.save(reqBody.email));
        int orderNum = UUIDToInt.generateIntFromUUID();
        Order order = orderService.write(actor, orderNum, reqBody.address);

        reqBody.items.stream()
                .map(item ->
                        orderItemService.createOrderItem(
                                order,
                                item.productId,
                                item.count,
                                "배송준비중"
                        )
                ).toList();
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
