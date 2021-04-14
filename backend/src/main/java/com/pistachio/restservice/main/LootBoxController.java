package com.pistachio.restservice.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "https://almond-pistachio-front-end.herokuapp.com")
public class LootBoxController
{
    @Autowired
    private LootBoxRepository LootBoxRepo;

    @PostMapping("/lootbox/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public LootBox add(@RequestBody LootBox lb) {return LootBoxRepo.save(lb);}

    @GetMapping("/lootboxes")
    public List<LootBox> getAll() {return LootBoxRepo.findAll();}

    @GetMapping(value = "/lootbox/{id}")
    public LootBox getOne(@PathVariable String id) {
        return LootBoxRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
    }

    @PutMapping(value = "/lootbox/{id}")
    public LootBox update(@PathVariable String id, @RequestBody LootBox updatedLB) {
        LootBox lb = LootBoxRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
//        task.setName(updatedTask.getName());
//        task.setDescription(updatedTask.getDescription());
//        task.setReward(updatedTask.getReward());
//        task.setCompletionCriteria(updatedTask.getCompletionCriteria());
        return LootBoxRepo.save(lb);
    }

    @DeleteMapping(value = "/lootbox/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void delete(@PathVariable String id) {
        LootBox LB = LootBoxRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
        LootBoxRepo.delete(LB);
    }
}