package com.back.global.initData;

import com.back.domain.member.member.entity.Member;
import com.back.domain.member.member.service.MemberService;
import com.back.domain.order.order.entity.Order;
import com.back.domain.order.order.service.OrderService;
import com.back.domain.product.product.entity.Product;
import com.back.domain.product.product.service.ProductService;
import com.back.global.util.NumberGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class BaseInitData {
    @Autowired
    @Lazy
    private BaseInitData self;
    private final ProductService productService;
    private final OrderService orderService;
    private final MemberService memberService;

    @Bean
    ApplicationRunner baseInitDataApplicationRunner() {
        return args -> {
            self.BaseWork();
        };
    }

    @Transactional
    public List<Product> work1() { // 1. 생성된 Product 리스트를 반환하도록 변경
        if (productService.count() > 0) return productService.findAll();

        Product product1 = productService.write("상품1", "이미지1.jpg", "상품1 정보", 10000, "상품1 영문명");
        Product product2 = productService.write("상품2", "이미지2.jpg", "상품2 정보", 20000, "상품2 영문명");
        Product product3 = productService.write("상품3", "이미지3.jpg", "상품3 정보", 30000, "상품3 영문명");

        return List.of(product1, product2, product3);
    }

    @Transactional
    public void work2(List<Product> products) { // 2. Product 리스트를 파라미터로 받도록 변경
        if (orderService.count() > 0) return;

        Member user1 = memberService.write("aaa@naver.com");
        Member user2 = memberService.write("bbb@gmail.com");
        Member user3 = memberService.write("ccc@programers.com");

        user1 = memberService.findById(1).orElseThrow(() -> new IllegalArgumentException("User with ID 1 does not exist."));
        user2 = memberService.findById(2).orElseThrow(() -> new IllegalArgumentException("User with ID 2 does not exist."));
        user3 = memberService.findById(3).orElseThrow(() -> new IllegalArgumentException("User with ID 3 does not exist."));

        Order order1 = orderService.write(user1, NumberGenerator.generateRandomNumber(6), "서울시 강남구 역삼동");
        Order order2 = orderService.write(user2, NumberGenerator.generateRandomNumber(6), "대전광역시 동구 자양동");
        Order order3 = orderService.write(user3, NumberGenerator.generateRandomNumber(6), "부산광역시 해운대구 우동");

        order1.addItem(products.get(0), 2, LocalDateTime.now().plusDays(3), "상품 준비 중");
        order1.addItem(products.get(1), 1, LocalDateTime.now().plusDays(2), "배송중");
        order2.addItem(products.get(1), 3, LocalDateTime.now(), "배송완료");
        order3.addItem(products.get(2), 1, LocalDateTime.now().plusDays(4), "입금 확인 중");
    }

    @Transactional
    public void BaseWork() {
        List<Product> products = self.work1(); // work1의 결과를 받음
        self.work2(products);                 // work2에 전달
    }
}