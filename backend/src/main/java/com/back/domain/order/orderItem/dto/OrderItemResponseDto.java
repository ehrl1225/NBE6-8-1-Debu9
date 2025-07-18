package com.back.domain.order.orderItem.dto;

import com.back.domain.order.orderItem.entity.OrderItem;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.security.SecureRandom;

@Getter
@Setter
@NoArgsConstructor
public class OrderItemResponseDto {
    private int orderItem_id; // OrderItem의 id (필드명 변경)
    private String delivery_state;
    private String product_name;
    private String product_eng_name;
    private int price;
    private String image_url;
    private int count;
    private int orderItemNumber; // OrderItem의 고유 번호 (orderService의 generateUniqueOrderNum 수정 후 사용)

    // 이후 로직 수정 가능 -> Service에 동일한 로직 존재
    private static final SecureRandom secureRandom = new SecureRandom();

    public OrderItemResponseDto(OrderItem orderItem) {
        this.orderItem_id = orderItem.getId(); // OrderItem의 ID 매핑
        this.delivery_state = orderItem.getDeliveryState();
        this.product_name = orderItem.getProduct().getName();
        this.product_eng_name = orderItem.getProduct().getEngName();
        this.price = orderItem.getProduct().getPrice();
        this.image_url = orderItem.getProduct().getImageUrl();
        this.count = orderItem.getCount();
        this.orderItemNumber = generateRandomNumber(8);
    }

    private static int generateRandomNumber(int digits) {
        if (digits <= 0 || digits > 9) { // int 범위 내에서 9자리까지만 유효
            throw new IllegalArgumentException("자릿수는 1에서 9 사이여야 합니다.");
        }
        int min = (int) Math.pow(10, digits - 1);
        int max = (int) Math.pow(10, digits) - 1;
        return secureRandom.nextInt(max - min + 1) + min;
    }
}
}