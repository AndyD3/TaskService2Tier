package com.dts.backend.tech_challenge_backend.service;

import com.dts.backend.tech_challenge_backend.dto.TaskDTO;
import com.dts.backend.tech_challenge_backend.entity.TaskEntity;
import com.dts.backend.tech_challenge_backend.exception.ResourceNotFoundException;
import com.dts.backend.tech_challenge_backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    private TaskDTO mapToDTO(TaskEntity taskEntity) {
        return new TaskDTO(taskEntity.getId(), taskEntity.getTitle(), taskEntity.getDescription(), taskEntity.getStatus(), taskEntity.getDueDate());
    }

    //TODO ID
    private TaskEntity mapToEntity(TaskDTO taskDTO) {
        return new TaskEntity(taskDTO.getTitle(), taskDTO.getDescription(), taskDTO.getStatus(), taskDTO.getDueDate());
    }

    public List<TaskDTO> getAll() {
        return taskRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public TaskDTO getById(Long id) {
        TaskEntity taskEntity = taskRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        return mapToDTO(taskEntity);
    }

    public TaskDTO create(TaskDTO taskDto) {
        TaskEntity taskEntity = mapToEntity(taskDto);
        TaskEntity savedTask = taskRepository.save(taskEntity);
        return mapToDTO(savedTask);
    }

    public TaskDTO update(TaskDTO taskDto) {
        taskRepository.findById(taskDto.getId()).orElseThrow(ResourceNotFoundException::new);

        TaskEntity taskEntity = mapToEntity(taskDto);
        taskEntity.setId(taskDto.getId()); //tODO make better...
        TaskEntity savedTask = taskRepository.save(taskEntity);
        return mapToDTO(savedTask);
    }

    public void delete(Long id) {
        taskRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        taskRepository.deleteById(id);
    }
}