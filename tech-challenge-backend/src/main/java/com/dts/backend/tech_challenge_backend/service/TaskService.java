package com.dts.backend.tech_challenge_backend.service;

import com.dts.backend.tech_challenge_backend.dto.TaskDTO;
import com.dts.backend.tech_challenge_backend.entity.TaskEntity;
import com.dts.backend.tech_challenge_backend.exception.ResourceNotFoundException;
import com.dts.backend.tech_challenge_backend.repository.TaskRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    private final ModelMapper modelMapper = new ModelMapper();

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<TaskDTO> getAll() {
        return taskRepository.findAll().stream()
                .map(entity -> modelMapper.map(entity, TaskDTO.class))
                .collect(Collectors.toList());
    }

    public TaskDTO getById(Long id) {
        TaskEntity taskEntity = taskRepository.findById(id).orElseThrow(ResourceNotFoundException::new);

        return modelMapper.map(taskEntity, TaskDTO.class);
    }

    public TaskDTO create(TaskDTO taskDto) {
        TaskEntity taskEntity = modelMapper.map(taskDto, TaskEntity.class);
        TaskEntity savedTask = taskRepository.save(taskEntity);

        return modelMapper.map(savedTask, TaskDTO.class);
    }

    public TaskDTO update(TaskDTO taskDto) {
        taskRepository.findById(taskDto.getId()).orElseThrow(ResourceNotFoundException::new);

        TaskEntity taskEntity = modelMapper.map(taskDto, TaskEntity.class);
        TaskEntity savedTask = taskRepository.save(taskEntity);
        return modelMapper.map(savedTask, TaskDTO.class);
    }

    public void delete(Long id) {
        taskRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        taskRepository.deleteById(id);
    }
}