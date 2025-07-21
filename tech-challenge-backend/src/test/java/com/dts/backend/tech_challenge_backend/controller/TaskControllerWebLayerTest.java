package com.dts.backend.tech_challenge_backend.controller;

import com.dts.backend.tech_challenge_backend.dto.TaskDTO;
import com.dts.backend.tech_challenge_backend.entity.TaskStatus;
import com.dts.backend.tech_challenge_backend.exception.ResourceNotFoundException;
import com.dts.backend.tech_challenge_backend.service.TaskService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import util.TaskMapper;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest
public class TaskControllerWebLayerTest {

    private final Random r = new Random();

    TaskMapper taskMapper = new TaskMapper();

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TaskService service;

    private final TaskDTO emptyTask = new TaskDTO(0,
            "", "", null, null);

    final String allValidationMandatoryMessages = "{'dueDate':'Due date is mandatory','description':'Description is mandatory','title':'Title is mandatory','status':'Status is mandatory'}";


    @Test
    public void shouldGetAllAsList() throws Exception {

        TaskDTO task = new TaskDTO(1L, "title" + r.nextInt(), "desc" + r.nextInt(), TaskStatus.DONE, LocalDate.now());
        TaskDTO task2 = new TaskDTO(2L, "title2" + r.nextInt(), "desc2" + r.nextInt(), TaskStatus.BLOCKED, LocalDate.now());

        List<TaskDTO> taskList = List.of(task, task2);

        Mockito.when(service.getAll()).thenReturn(taskList);

        this.mockMvc.perform(get("/api/tasks")).andDo(print()).andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].title", is(task.getTitle())))
                .andExpect(jsonPath("$[0].description", is(task.getDescription())))
                .andExpect(jsonPath("$[0].status", is(task.getStatus().toString())))
                .andExpect(jsonPath("$[0].dueDate", is(task.getDueDate().toString())))
                .andExpect(jsonPath("$[1].title", is(task2.getTitle())))
                .andExpect(jsonPath("$[1].description", is(task2.getDescription())))
                .andExpect(jsonPath("$[1].status", is(task2.getStatus().toString())))
                .andExpect(jsonPath("$[0].dueDate", is(task.getDueDate().toString())));


        verify(service, times(1)).getAll();
    }


    @Test
    public void shouldCreateAndReturnCreatedTask() throws Exception {

        TaskDTO task = new TaskDTO(5L, "title" + r.nextInt(), "desc" + r.nextInt(), TaskStatus.DONE, LocalDate.now());

        Mockito.when(service.create(task)).thenReturn(task);

        this.mockMvc.perform(post("/api/tasks").content(taskMapper.getRequestJson(task)).contentType(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is(task.getTitle())))
                .andExpect(jsonPath("$.description", is(task.getDescription())))
                .andExpect(jsonPath("$.status", is(task.getStatus().toString())))
                .andExpect(jsonPath("$.dueDate", is(task.getDueDate().toString())));

        verify(service, times(1)).create(task);
    }

    @Test
    public void shouldReturnValidationResponseWithMessageWhenCreatedTaskFailsValidation() throws Exception {

        Mockito.when(service.create(emptyTask)).thenReturn(emptyTask);

        this.mockMvc.perform(post("/api/tasks").content(taskMapper.getRequestJson(emptyTask)).contentType(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(content().json(allValidationMandatoryMessages));

        verify(service, times(0)).create(emptyTask);
    }

    @Test
    public void shouldUpdate() throws Exception {

        TaskDTO task = new TaskDTO(0, "title" + r.nextInt(), "desc" + r.nextInt(), TaskStatus.NOT_STARTED, LocalDate.now());
        task.setId(1L);

        Mockito.when(service.update(task)).thenReturn(task);

        this.mockMvc.perform(put("/api/tasks/1").content(taskMapper.getRequestJson(task)).contentType(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is(task.getTitle())))
                .andExpect(jsonPath("$.description", is(task.getDescription())))
                .andExpect(jsonPath("$.status", is(task.getStatus().toString())))
                .andExpect(jsonPath("$.dueDate", is(task.getDueDate().toString())));

        verify(service, times(1)).update(task);
    }

    @Test
    public void shouldErrorForUpdateWhenTaskNotFound() throws Exception {

        TaskDTO task = new TaskDTO(0, "title" + r.nextInt(), "desc" + r.nextInt(), TaskStatus.DONE, LocalDate.now());
        task.setId(1L);

        Mockito.when(service.update(any())).thenThrow(new ResourceNotFoundException());

        this.mockMvc.perform(put("/api/tasks/1").content(taskMapper.getRequestJson(task)).contentType(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isNotFound()).andExpect(jsonPath("$").doesNotExist());

        verify(service, times(1)).update(any());
    }

    @Test
    public void shouldReturnValidationResponseWithMessageWhenUpdatedTaskFailsValidation() throws Exception {

        Mockito.when(service.create(emptyTask)).thenReturn(emptyTask);

        this.mockMvc.perform(put("/api/tasks/1").content(taskMapper.getRequestJson(emptyTask)).contentType(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(content().json(allValidationMandatoryMessages));

        verify(service, times(0)).create(emptyTask);
    }

    @Test
    public void shouldDelete() throws Exception {
        this.mockMvc.perform(delete("/api/tasks/1")).andDo(print()).andExpect(status().isNoContent()).andExpect(jsonPath("$").doesNotExist());

        verify(service, times(1)).delete(1L);
    }

    @Test
    public void shouldErrorForDeleteWhenTaskNotFound() throws Exception {

        doThrow(new ResourceNotFoundException())
                .when(service)
                .delete(1L);

        this.mockMvc.perform(delete("/api/tasks/1")).andDo(print()).andExpect(status().isNotFound()).andExpect(jsonPath("$").doesNotExist());

        verify(service, times(1)).delete(1L);
    }
}