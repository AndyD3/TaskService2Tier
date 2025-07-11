package com.dts.backend.tech_challenge_backend.service;

import com.dts.backend.tech_challenge_backend.dto.Task;
import com.dts.backend.tech_challenge_backend.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Repository;
import org.springframework.test.annotation.DirtiesContext;

import java.time.LocalDate;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

@SpringBootTest
public class TaskServiceUnitTest {

    // todo - change this??
    // relies on SeedDatabase

    @Autowired
    private TaskService taskService;

    @Test
    public void shouldCreateInitialRecordsAtStartup() {
        List<Task> items = taskService.getAll();
        assertThat(items.size(), equalTo(3));
    }

    @DirtiesContext
    @Test
    public void shouldCreateSpecifiedTask() {
        Task newTask = new Task("Task 1", "get started", "in progress", LocalDate.now());

        taskService.createOrUpdate(newTask);
        assertThat(taskService.getAll().size(), equalTo(4));
    }

    @Test
    public void shouldReturnSpecifiedTask() {

        long taskId = 2;
        Task expectedItem = new Task("Task 2", "graft", "Not started", LocalDate.now());
        expectedItem.setId(taskId);

        Task item = taskService.getById(taskId).get();
        assertThat(item, equalTo(expectedItem));
    }

    @Test
    public void shouldUpdateTask() {

        long taskId = 1;
        Task expectedItem = new Task("Task 1", "get started", "in progress", LocalDate.now());
        expectedItem.setId(taskId);

        taskService.createOrUpdate(expectedItem);
        assertThat(taskService.getById(taskId).get(), equalTo(expectedItem));
    }

    @DirtiesContext
    @Test
    public void shouldDeleteTask() {
        taskService.delete(2L);
        assertThat(taskService.getAll().size(), equalTo(2));
    }
}