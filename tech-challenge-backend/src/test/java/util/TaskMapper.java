package util;

import com.dts.backend.tech_challenge_backend.dto.TaskDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;

public class TaskMapper {

    private final ObjectMapper mapper = new ObjectMapper();
    private final ObjectWriter ow;

    public TaskMapper() {
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        mapper.findAndRegisterModules();
        ow = mapper.writer().withDefaultPrettyPrinter();
    }

    public String getRequestJson(TaskDTO task) throws JsonProcessingException {
        return ow.writeValueAsString(task);
    }
}
