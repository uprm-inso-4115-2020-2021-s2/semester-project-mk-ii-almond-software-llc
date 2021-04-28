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
    
    @Autowired
    private PlayerRepository PlayerRepo;
    
    @Autowired
    private MonsterRepository MonsterRepo;

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
        lb.setMonsters(updatedLB.getMonsters());
        return LootBoxRepo.save(lb);
    }

    @DeleteMapping(value = "/lootbox/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void delete(@PathVariable String id) {
        LootBox LB = LootBoxRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
        LootBoxRepo.delete(LB);
    }
    
    @GetMapping(value = "/lootbox/open/{id}/{player}")    
    public Monster openLootbox(@PathVariable String id, @PathVariable String player) {
    	Player p = PlayerRepo.findById(player).orElseThrow(() -> new ResourceNotFoundException());
    	LootBox L = getOne(id);
    	
    	Monster ReturnMonster = MonsterRepo.findById(LootBox.OpenLootbox(L))
    							.orElseThrow(() -> new ResourceNotFoundException());
    	
    	if(ReturnMonster.getName().startsWith("PISTACHIO")) {
    		//Cash monster
    		//WILL HAVE NAME "PISTACHIO:(AMOUNT AS INT)"
    		p.addPistachio(Integer.parseInt(ReturnMonster.getName().split(":")[1])); //all in one line baby
    		
    	} else {p.addMonster(ReturnMonster);}
    	
    	PlayerRepo.save(p);
    	return ReturnMonster; 
    	
    }
}