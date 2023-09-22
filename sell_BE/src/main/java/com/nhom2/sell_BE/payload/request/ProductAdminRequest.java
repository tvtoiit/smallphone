package com.nhom2.sell_BE.payload.request;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductAdminRequest {
  private String title;

  private BigDecimal price;

  private int discount;

  private int number;

  private int releaseTime;

  private String description;

  private String productTypeId;

  private String configId;
}
