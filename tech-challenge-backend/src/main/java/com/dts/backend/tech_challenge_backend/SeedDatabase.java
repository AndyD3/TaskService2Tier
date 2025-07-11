package com.dts.backend.tech_challenge_backend;


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

    @Bean
    CommandLineRunner initDatabase(TaskRepository repository) {

        return args -> {
            //todo make better
            log.info("Preloading " + repository.save(new Task("Task 1", "get started", "Not started", LocalDate.now())));
            log.info("Preloading " + repository.save(new Task("Task 2", "graft", "Not started", LocalDate.now())));
            log.info("Preloading " + repository.save(new Task("Task 3", "power down", "Not started", LocalDate.now())));
        };
    }
}