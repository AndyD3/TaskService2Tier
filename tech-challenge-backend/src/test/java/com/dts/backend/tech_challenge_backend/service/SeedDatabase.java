package com.dts.backend.tech_challenge_backend.service;


import com.dts.backend.tech_challenge_backend.dto.Task;
import com.dts.backend.tech_challenge_backend.repository.TaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
class SeedDatabase {

    private static final Logger log = LoggerFactory.getLogger(SeedDatabase.class);

    static Task task1 = new Task("Task 1", "get started", "Not started", LocalDate.now().plusWeeks(2));
    static Task task2 = new Task("Task 2", "graft", "Blocked", LocalDate.now().plusMonths(1));
    static Task task3 = new Task("Task 3", "power down", "Done", LocalDate.now().plusDays(12));
    static Task task4 = new Task("Task 4", "celebrate", "Failed", LocalDate.now().plusMonths(5));

    @Bean
    CommandLineRunner initDatabase(TaskRepository repository) {

        return args -> {
            log.info("Preloading " + repository.save(task1));
            log.info("Preloading " + repository.save(task2));
            log.info("Preloading " + repository.save(task3));
            log.info("Preloading " + repository.save(task4));
        };
    }
}