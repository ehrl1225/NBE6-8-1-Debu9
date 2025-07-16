package com.back.domain.product.product.controller;

import com.back.domain.product.product.entity.Product;
import com.back.domain.product.product.service.ProductService;
import com.back.global.rsData.RsData;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Tag(name =  "PostController", description = "API 상품 컨트롤러")
public class ProductController {
    private final ProductService productService;

    record ProductModifyReqbody(

            @NotBlank @Size(min = 1, max = 100)
            String name,

            @NotBlank
            String imageUrl,

            @NotBlank
            String info,

            @NotBlank
            Integer price,

            String engName
    ) {
    }


    @PutMapping("/{id}")
    @Transactional
    @Operation(summary = "상품 수정")
    public RsData<Void> updateProduct(
            @PathVariable int id,
            @Valid @RequestBody ProductModifyReqbody reqBody
    ) {
        Product product = productService.findById(id).get();
        productService.modify(product, reqBody.name, reqBody.imageUrl, reqBody.info, reqBody.price, reqBody.engName);

        return new RsData<>(
                "200-1",
                "%d번 상품이 수정되었습니다.".formatted(product.getId())
        );
    }
}
