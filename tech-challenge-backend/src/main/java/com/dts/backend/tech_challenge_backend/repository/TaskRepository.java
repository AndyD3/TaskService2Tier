package com.dts.backend.tech_challenge_backend.repository;

import com.dts.backend.tech_challenge_backend.dto.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}