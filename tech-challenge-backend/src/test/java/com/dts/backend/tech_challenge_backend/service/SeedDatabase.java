package com.dts.backend.tech_challenge_backend.service;


import com.dts.backend.tech_challenge_backend.entity.TaskEntity;
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

    static TaskEntity task1 = new TaskEntity("Task 1", "get started", "Not started", LocalDate.now().plusWeeks(2));
    static TaskEntity task2 = new TaskEntity("Task 2", "graft", "Blocked", LocalDate.now().plusMonths(1));
    static TaskEntity task3 = new TaskEntity("Task 3", "power down", "Done", LocalDate.now().plusDays(12));
    static TaskEntity task4 = new TaskEntity("Task 4", "celebrate", "Failed", LocalDate.now().plusMonths(5));

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