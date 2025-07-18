package com.dts.backend.tech_challenge_backend.service;

import com.dts.backend.tech_challenge_backend.dto.TaskDTO;
import com.dts.backend.tech_challenge_backend.exception.ResourceNotFoundException;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class TaskServiceUnitTest {

    private final Random r = new Random();

    private final ModelMapper modelMapper = new ModelMapper();

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
    public void shouldUpdateTask() {

        long taskId = 1;
        TaskDTO expectedTask = new TaskDTO(taskId, "Task 1" + r.nextInt(), "get started" + r.nextInt(), "in progress", LocalDate.now());

        TaskDTO actualTask = taskService.update(expectedTask);
        assertThat(actualTask, equalTo(expectedTask));
    }

    @Test
    public void shouldThrowExceptionWhenTaskNotFoundUpdateTask() {

        long nonExistingTaskId = 1000L;
        TaskDTO task = new TaskDTO(nonExistingTaskId, "Task 1" + r.nextInt(), "get started" + r.nextInt(), "in progress", LocalDate.now());

        assertThrows(ResourceNotFoundException.class, () ->
                taskService.update(task));
    }

    @Test
    public void shouldDeleteTask() {
        int previousSize = taskService.getAll().size();
        taskService.delete(4L);
        assertThat(taskService.getAll().size(), equalTo(previousSize - 1));
    }

    @Test
    public void shouldThrowExceptionWhenTaskNotFoundDeleteTask() {

        long nonExistingTaskId = 1000L;

        assertThrows(ResourceNotFoundException.class, () ->
                taskService.delete(nonExistingTaskId));
    }
}