package com.back.domain.product.product.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Product extends BaseEntity {
    private String name;
    private String eng_name;
    private String info;
    private int price;
    private String image_url;

    // 생성자
    public Product(String name, String image_url, int price) {
        this.name = name;
        this.image_url = image_url;
        this.info = info;
        this.price = price;
        this.eng_name = eng_name;
    }

    // 수정 -> 서비스
    public void modify(String name, String image_url, String info, int price, String eng_name) {
        this.name = name;
        this.image_url = image_url;
        this.info = info;
        this.price = price;
        this.eng_name = eng_name;
    }

    // Getter 메서드
    public String getName() { return name; }
    public String getEng_name() { return eng_name; }
    public String getInfo() { return info; }
    public int getPrice() { return price; }
    public String getImage_url() { return image_url; }
}

