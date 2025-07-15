package com.dts.backend.tech_challenge_backend.controller;

import com.dts.backend.tech_challenge_backend.dto.Task;
import com.dts.backend.tech_challenge_backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    //todo use DTO not task

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<Task>> getAll() {
        List<Task> products = taskService.getAll();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getById(@PathVariable Long id) {
        Task product = taskService.getById(id).get(); //todo resolve
        return ResponseEntity.ok(product);
    }

    @PostMapping
    public ResponseEntity<Task> create(@RequestBody Task taskDTO) {
        Task createdProduct = taskService.createOrUpdate(taskDTO);
        return ResponseEntity.ok(createdProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable Long id, @RequestBody Task taskDTO) {
        taskDTO.setId(id);
        Task updatedProduct = taskService.createOrUpdate(taskDTO); //todo convert to using id from path..
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }
}