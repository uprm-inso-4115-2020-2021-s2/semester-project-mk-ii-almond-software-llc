package com.pistachio.restservice.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PlayerController
{
    @Autowired
    private PlayerRepository playerRepo;

    @PostMapping("/player/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Player add(@RequestBody Player player)
    {
        return playerRepo.save(player);
    }

    @GetMapping("/player")
    public List<Player> getAll() {
        return playerRepo.findAll();
    }

    @GetMapping(value = "/player/{id}")
    public Player getOne(@PathVariable String id) {
        return playerRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
    }

    @PutMapping(value = "/player/{id}")
    public Player update(@PathVariable String id, @RequestBody Player updatedPlayer) {
        Player player = playerRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
        player.setPassword(updatedPlayer.getPassword());
        player.setConfirmedFriends(updatedPlayer.getConfirmedFriends());
        player.setFriendRequests(updatedPlayer.getFriendRequests());
        player.setStatus(updatedPlayer.getStatus());
        player.setCollections(updatedPlayer.getCollections());
        player.setCompletedTasks(updatedPlayer.getCompletedTasks());
        player.setBattles(updatedPlayer.getBattles());
        player.setPistachios(updatedPlayer.getPistachios());

        return playerRepo.save(player);
    }

    @DeleteMapping(value = "/player/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void delete(@PathVariable String id) {
        Player player = playerRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
        playerRepo.delete(player);
    }
}
