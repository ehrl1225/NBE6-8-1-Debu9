package com.back.domain.order.order.service;

import com.back.domain.member.member.entity.Member;
import com.back.domain.member.member.repository.MemberRepository;
import com.back.domain.order.order.entity.Order;
import com.back.domain.order.order.repository.OrderRepository;
import com.back.domain.order.orderItem.entity.OrderItem;
import com.back.domain.order.orderItem.repository.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final MemberRepository memberRepository;

    public long count() {
        return orderRepository.count();
    }

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public Optional<Order> findById(int id) {
        return orderRepository.findById(id);
    }

    public Order write(int userId, int productId, String address) {
        Order order = new Order(userId, productId, address);

        return orderRepository.save(order);
    }

    @Transactional
    public OrderItem createOrderItem(int orderId, int productId, int count, String deliveryState) {
        LocalDateTime expectedDeliveryDate = LocalDateTime.now().plusDays(3).withHour(14).withMinute(0).withSecond(0);
        OrderItem orderItem = new OrderItem(orderId, productId, count, expectedDeliveryDate, deliveryState);
        return orderItemRepository.save(orderItem);
    }

    public List<OrderItem> getOrderItemsByOrderId(int orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }


    public boolean delete(int id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public void modifyitem(OrderItem orderItem, int count, LocalDateTime expectedDeliveryDate, String deliveryState) {
        orderItem.modify(count, expectedDeliveryDate, deliveryState);
    }
}
