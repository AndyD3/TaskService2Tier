package util;

import com.dts.backend.tech_challenge_backend.dto.TaskDTO;
import com.dts.backend.tech_challenge_backend.entity.TaskEntity;

public class TaskMappings {
    static public TaskDTO mapToDTO(TaskEntity taskEntity) {
        return new TaskDTO(taskEntity.getId(), taskEntity.getTitle(), taskEntity.getDescription(), taskEntity.getStatus(), taskEntity.getDueDate());
    }

    static public TaskEntity mapToEntity(TaskDTO taskDTO) {
        return new TaskEntity(taskDTO.getTitle(), taskDTO.getDescription(), taskDTO.getStatus(), taskDTO.getDueDate());
    }
}
