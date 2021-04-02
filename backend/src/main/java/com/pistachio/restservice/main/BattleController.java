package com.pistachio.restservice.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "https://almond-pistachio-front-end.herokuapp.com")
public class BattleController
{
    @Autowired
    private BattleRepository battleRepo;
    @Autowired
    private MonsterRepository monsterRepo;
    @Autowired
    private PlayerRepository playerRepo;

    @PostMapping("/battle/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Battle add(@RequestBody Battle Battle) {
        return battleRepo.save(Battle);
    }

    @GetMapping("/battle")
    public List<Battle> getAll() {
        return battleRepo.findAll();
    }

    @GetMapping(value = "/battle/{id}")
    public Battle getOne(@PathVariable String id) {
        return battleRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException());
    }

    @PutMapping(value = "/battle/{id}")
    public Battle update(@PathVariable String id, @RequestBody Battle updatedBattle) {
        Battle battle = battleRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException());
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
        Battle battle = battleRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException());
        battleRepo.delete(battle);
    }

    @GetMapping("/battle/findBySecondPlayerID")
    public List<Battle> findBySecondPlayerID(@RequestParam(name = "player") String name) {
        return battleRepo.findBySecondPlayerID(name);
    }

    @PutMapping("/battle/queue")
    public Battle matchmake(@RequestParam(name = "player") String name) {

        
        //Get player thingy

        Player playerSearchingForBattle = playerRepo.findById(name).get();
        
        // Search for available battles

        List<Battle> battleList = this.findBySecondPlayerID("");

        // If no battles are available
        if (battleList.isEmpty()) {
           Battle battleToCreate = new Battle();

            // Set player 1
            battleToCreate.setFirstPlayerID(playerSearchingForBattle.getUser());

            // Set player 1 team
            System.out.println(playerSearchingForBattle);

            List<Monster> team = new ArrayList<Monster>();

            List<String> teamList = playerSearchingForBattle.getTeam();

            for (String monster : teamList) {
                Monster mon = monsterRepo.findById(monster).get();
                team.add(mon);
            }

            battleToCreate.setFirstPlayerTeam(team);

            return battleRepo.save(battleToCreate);

        }
        // If there are available battles
        else {
            // Insert Player into available battle
            Battle battleToInsert = battleList.get(0);

            //Check that we're not inserting player into a battle with itself and if we are then move on to the next one in the list if possible
            if (battleToInsert.getFirstPlayerID().equals(playerSearchingForBattle.getUser()))
            {
                if(battleList.size() > 1)
                {
                    battleToInsert = battleList.get(1);
                }

            }

            // Set player2
            battleToInsert.setSecondPlayerID(playerSearchingForBattle.getUser());

             // Set player 2team
             System.out.println(playerSearchingForBattle);

             List<Monster> team = new ArrayList<Monster>();
 
             List<String> teamList = playerSearchingForBattle.getTeam();
 
             for (String monster : teamList) {
                 Monster mon = monsterRepo.findById(monster).get();
                 team.add(mon);
             }
 
             battleToInsert.setSecondPlayerTeam(team);

            return battleRepo.save(battleToInsert);

        }
    }
}