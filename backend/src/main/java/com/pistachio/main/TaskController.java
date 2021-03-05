package com.pistachio.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
//@CrossOrigin(origins = "http://localhost:3000")
public class TaskController
{
    @Autowired
    private TaskRepository taskRepo;

    @PostMapping("/task/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Task add(@RequestBody Task Task)
    {
        return taskRepo.save(Task);
    }

    @GetMapping("/task")
    public List<Task> getAll() {
        return taskRepo.findAll();
    }

    @GetMapping(value = "/task/{id}")
    public Task getOne(@PathVariable String id) {
        return taskRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
    }

    @PutMapping(value = "/task/{id}")
    public Task update(@PathVariable String id, @RequestBody Task updatedTask) {
        Task Task = taskRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
        Task.setName(updatedTask.getName());
        Task.setDescription(updatedTask.getDescription());
        Task.setReward(updatedTask.getReward());
        Task.setCompletionCriteria(updatedTask.getCompletionCriteria());
        return taskRepo.save(Task);
    }

    @DeleteMapping(value = "/task/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void delete(@PathVariable String id) {
        Task Task = taskRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
        taskRepo.delete(Task);
    }
}