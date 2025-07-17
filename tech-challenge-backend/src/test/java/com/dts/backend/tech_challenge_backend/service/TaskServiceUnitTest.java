package com.dts.backend.tech_challenge_backend.service;

import com.dts.backend.tech_challenge_backend.dto.TaskDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import util.TaskMappings;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

@SpringBootTest
public class TaskServiceUnitTest {

    private final Random r = new Random();

    @Autowired
    private TaskService taskService;

    @Test
    public void shouldCreateInitialRecordsAtStartup() {
        List<TaskDTO> items = taskService.getAll();
        assertThat(items.size(), equalTo(4));
    }

    @Test
    public void shouldCreateSpecifiedTask() {
        //TODO not happy with this..should refresh DB
        int previousSize = taskService.getAll().size();

        TaskDTO newTask = new TaskDTO("Task 5", "get started", "in progress", LocalDate.now());
        taskService.create(newTask);

        assertThat(taskService.getAll().size(), equalTo(previousSize + 1));
    }

    @Test
    public void shouldReturnSpecifiedTask() {
        long taskId = 2;
        TaskDTO item = taskService.getById(taskId);
        assertThat(item, equalTo(TaskMappings.mapToDTO(SeedDatabase.task2)));
    }

    @Test
    public void shouldUpdateTask() {

        long taskId = 1;
        TaskDTO expectedTask = new TaskDTO(taskId, "Task 1" + r.nextInt(), "get started" + r.nextInt(), "in progress", LocalDate.now());

        TaskDTO actualTask = taskService.update(expectedTask);
        assertThat(actualTask, equalTo(expectedTask));
    }

    @Test
    public void shouldDeleteTask() {
        int previousSize = taskService.getAll().size();
        taskService.delete(4L);
        assertThat(taskService.getAll().size(), equalTo(previousSize - 1));
    }
}