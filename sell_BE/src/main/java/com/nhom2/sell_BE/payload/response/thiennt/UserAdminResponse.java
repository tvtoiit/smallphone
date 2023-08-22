package com.nhom2.sell_BE.payload.response.thiennt;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserAdminResponse {
  private String userId;
 
  private String fullName;

  private  String phoneNumber;

  private  String email;

  private String address;

  private Boolean status;

  private Date createdAt;

  private Date updatedAt;

  private String accountId;

  private String role;
}
