package com.nhom2.sell_BE.services;

import org.springframework.data.domain.Page;

import com.nhom2.sell_BE.payload.response.ProductDetailsResponse;
import com.nhom2.sell_BE.payload.response.ProductResponse;
import com.nhom2.sell_BE.payload.response.ProductTypeResponse;

import java.util.List;

public interface ProductService {

    List<ProductTypeResponse> getAllProductByProductType();

    Page<ProductResponse> getAllProductByProductTypeSeeMore(String productTypeId, int pageNumber, int pageSize);

    ProductDetailsResponse getProductDetails(String productId);

    List<ProductResponse> searchProduct(String keyword);
}
