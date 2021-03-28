package com.pistachio.restservice.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BattleController
{
    @Autowired
    private BattleRepository battleRepo;

    @PostMapping("/battle/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Battle add(@RequestBody Battle Battle)
    {
        return battleRepo.save(Battle);
    }

    @GetMapping("/battle")
    public List<Battle> getAll() {
        return battleRepo.findAll();
    }

    @GetMapping(value = "/battle/{id}")
    public Battle getOne(@PathVariable String id) {
        return battleRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
    }

    @PutMapping(value = "/battle/{id}")
    public Battle update(@PathVariable String id, @RequestBody Battle updatedBattle) {
        Battle battle = battleRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
        battle.setBattleID(updatedBattle.getBattleID());
        // battle.setActionLog(updatedBattle.getActionLog());
        battle.setFirstPlayerID(updatedBattle.getFirstPlayerID());
        battle.setFirstPlayerTeam(updatedBattle.getFirstPlayerTeam());
        battle.setSecondPlayerID(updatedBattle.getSecondPlayerID());
        battle.setSecondPlayerTeam(updatedBattle.getSecondPlayerTeam());
        // battle.setActionLog(updatedBattle.getActionLog());

        return battleRepo.save(battle);
    }

    @DeleteMapping(value = "/battle/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void delete(@PathVariable String id) {
        Battle battle = battleRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
        battleRepo.delete(battle);
    }

    @GetMapping("/battle/findBySecondPlayerID")
    public Battle findBySecondPlayerID(@RequestParam(name = "player") String name) {
        return battleRepo.findBySecondPlayerID(name)
        .orElse(null);
    }

}