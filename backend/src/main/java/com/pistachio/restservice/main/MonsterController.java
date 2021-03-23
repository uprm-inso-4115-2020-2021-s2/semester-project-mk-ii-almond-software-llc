package com.pistachio.restservice.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MonsterController
{
    @Autowired
    private MonsterRepository monsterRepo;

    @PostMapping("/monster/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Monster add(@RequestBody Monster monster)
    {
        return monsterRepo.save(monster);
    }

    @GetMapping("/monster")
    public List<Monster> getAll() {
        return monsterRepo.findAll();
    }

    @GetMapping(value = "/monster/{id}")
    public Monster getOne(@PathVariable String id) {
        return monsterRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
    }

    @PutMapping(value = "/monster/{id}")
    public Monster update(@PathVariable String id, @RequestBody Monster updatedmonster) {
        Monster monster = monsterRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
        monster.setID(updatedmonster.getID());
        monster.setName(updatedmonster.getName());
        monster.setMoves(updatedmonster.getMoves());
        monster.setStats(updatedmonster.getStats());

        
        return monsterRepo.save(monster);
    }

    @DeleteMapping(value = "/monster/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void delete(@PathVariable String id) {
        Monster monster = monsterRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
        monsterRepo.delete(monster);
    }
}
