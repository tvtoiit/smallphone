package com.nhom2.sell_BE.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "tbl_user")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "user_id", length = 36, nullable = false)
    private String userId;

    @Column(name = "full_name", columnDefinition = "VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci", nullable = false)
    private String fullName;

    @Column(name = "phone_number", length = 12)
    private  String phoneNumber;

    @Column(name = "email", length = 50, nullable = false,unique = true)
    private  String email;

    @Column(name = "address", columnDefinition = "VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
    private String address;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "created_at", nullable = false)
    @CreationTimestamp
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @OneToMany(mappedBy="user")
    private Set<Comment> comments = new HashSet<>();

    @OneToMany(mappedBy="user")
    private Set<Order> orders = new HashSet<>();
}
