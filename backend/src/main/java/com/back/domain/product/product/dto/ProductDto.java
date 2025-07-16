package com.back.domain.product.product.dto;

public class ProductDto {
    private Long id;
    private String name;
    private String eng_name;
    private String info;
    private int price;
    private String image_url;

    // 기본 생성자
    public ProductDto() {}

    // Getter & Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEng_name() { return eng_name; }
    public void setEng_name(String eng_name) { this.eng_name = eng_name; }

    public String getInfo() { return info; }
    public void setInfo(String info) { this.info = info; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public String getImage_url() { return image_url; }
    public void setImage_url(String image_url) { this.image_url = image_url; }
}