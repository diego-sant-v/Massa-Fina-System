package com.backend.pizzaria.repository;

import com.backend.pizzaria.models.UsersModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<UsersModel, Long> {
    @Query(nativeQuery = true, value = "" +
            "SELECT * FROM users u where u.id = :id")
    UsersModel getUserById(@Param("id") Long id);

    @Query(nativeQuery = true, value = "" +
            "SELECT * FROM users u where u.email = :email AND u.password = :password")
    UsersModel userLogin(@Param("email") String email, @Param("password") String password);
}
