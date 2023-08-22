package com.nhom2.sell_BE.repositories;

import com.nhom2.sell_BE.entities.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WardRepository extends JpaRepository<Ward, String> {
}
