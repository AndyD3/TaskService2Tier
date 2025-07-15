package com.dts.backend.tech_challenge_backend.controller;

import com.dts.backend.tech_challenge_backend.dto.Task;
import com.dts.backend.tech_challenge_backend.service.TaskService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JSR310Module;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import util.TaskMapper;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest
public class WebLayerTest {

    private Random r = new Random();

    TaskMapper taskMapper=new TaskMapper();

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TaskService service;

    @Test
    public void shouldGetAll() throws Exception {

        Task task=new Task("title"+r.nextInt(), "desc"+r.nextInt(), "status"+r.nextInt(), LocalDate.now());

        List<Task> taskList = List.of(task);

        Mockito.when(service.getAll()).thenReturn(taskList);

        this.mockMvc.perform(get("/api/tasks")).andDo(print()).andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].description", is(task.getDescription()))); //TODO convert to JSON object using serialiser as is less fragile

        verify(service, times(1)).getAll();
    }

    @Test
    public void shouldGetByID() throws Exception {
        //TODO remove this?
    }

    @Test
    public void shouldCreate() throws Exception {

        Task task=new Task("title"+r.nextInt(), "desc"+r.nextInt(), "status"+r.nextInt(), LocalDate.now());

        this.mockMvc.perform(post("/api/tasks").content(taskMapper.getRequestJson(task)).contentType(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isOk());

        //todo add asserting content
    }

    @Test
    public void shouldUpdate() throws Exception {
    }

    @Test
    public void shouldDelete() throws Exception {
        this.mockMvc.perform(delete("/api/tasks/1")).andDo(print()).andExpect(status().isNoContent());
    }


    //todo test exceptions
}