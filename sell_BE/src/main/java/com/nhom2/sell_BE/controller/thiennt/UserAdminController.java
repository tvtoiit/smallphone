package com.nhom2.sell_BE.controller.thiennt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nhom2.sell_BE.payload.request.thiennt.RequestUpdateUser;
import com.nhom2.sell_BE.payload.request.thiennt.UserAdminRequest;
import com.nhom2.sell_BE.services.thiennt.UserAdminService;

@RestController
 @CrossOrigin(origins = "http://localhost:8080")
@RequestMapping(value = "/api/v1/user_admin")
public class UserAdminController {
  @Autowired
  private UserAdminService userAdminService;

  @GetMapping("/{token}")
  public ResponseEntity<Object> getUSerAdminByToken(@PathVariable("token") String token) {
    return userAdminService.getUSerAdminByToken(token);
  }
  
  @GetMapping("")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Object> getAllUser() {
    return userAdminService.getAllUSerAdmin();
  }
  
  @PostMapping("/create")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Object> getCreateUser(@RequestBody UserAdminRequest request) {
    return userAdminService.createUSerAdmin(request);
  }
  
  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Object> updateUser(@PathVariable("id") String id, @RequestBody RequestUpdateUser request) {
    return userAdminService.updateUser(id, request);
  }
  
  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Object> deleteUser(@PathVariable("id") String id) {
    return userAdminService.delete(id);
  }
}
