package com.dts.backend.tech_challenge_backend.service;

import com.dts.backend.tech_challenge_backend.dto.Task;
import com.dts.backend.tech_challenge_backend.exception.ResourceNotFoundException;
import com.dts.backend.tech_challenge_backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAll() {
        return taskRepository.findAll();
    }

    public Optional<Task> getById(Long id) {
        return taskRepository.findById(id);
    }

    public Task create(Task task) {
        return taskRepository.save(task);
    }

    public Task update(Task task) {
        taskRepository.findById(task.getId()).orElseThrow(ResourceNotFoundException::new);
        return taskRepository.save(task);
    }

    public void delete(Long id) {
        taskRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        taskRepository.deleteById(id);
    }
}