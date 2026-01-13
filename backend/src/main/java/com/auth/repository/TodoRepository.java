package com.auth.repository;

import com.auth.entity.Todo;
import com.auth.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUser(User user);
    List<Todo> findByUserOrderByCreatedAtDesc(User user);

    // Pagination queries with various sort options
    Page<Todo> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);
    Page<Todo> findByUserOrderByCreatedAtAsc(User user, Pageable pageable);

    Page<Todo> findByUserOrderByTitleAsc(User user, Pageable pageable);
    Page<Todo> findByUserOrderByTitleDesc(User user, Pageable pageable);

    Page<Todo> findByUserOrderByCompletedAsc(User user, Pageable pageable);
    Page<Todo> findByUserOrderByCompletedDesc(User user, Pageable pageable);

    Page<Todo> findByUserOrderByUpdatedAtDesc(User user, Pageable pageable);
    Page<Todo> findByUserOrderByUpdatedAtAsc(User user, Pageable pageable);
}
