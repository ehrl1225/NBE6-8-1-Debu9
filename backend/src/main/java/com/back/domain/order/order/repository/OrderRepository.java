package com.back.domain.order.order.repository;


import com.back.domain.order.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("SELECT o FROM Order o JOIN FETCH o.items oi JOIN FETCH oi.product p WHERE o.user.email = :email")
    List<Order> findAllByMemberEmailWithItemsAndProducts(String email);

    @Query("SELECT o FROM Order o JOIN FETCH o.items oi JOIN FETCH oi.product p")
    List<Order> findAllWithItemsAndProducts();

    Optional<Order> findByOrderNum(int orderNum);

}

