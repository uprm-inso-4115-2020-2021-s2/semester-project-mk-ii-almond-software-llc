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
    
    /**
     * Adds the origin player to the destination player's friend list
     * @param Origin
     * @param Destination
     */
    public void AddFriend(String Origin, String Destination) {
    	//Get the destination player
    	//Verify that the origin player is not already in either friend list.
    	//Add the origin player to the pending friends list
    	//save the destination player
    }
    
    /**
     * Makes the destination player accepts a request from the origin player
     * @param Origin
     * @param Destination
     */
    public void AcceptFriend(String Origin, String Destination) {
    	//Get the origin and destination player
    	//Verify that the destination player has a request from the origin player
    	//remove the origin player from the destination player's pending friends list
    	//Add the origin player to the destination player's friends list.
    	//Add the destination player to the origin player's friends list.
		//Save both players
    }
    
    /**
     * Makes the destination player reject a request from the origin player
     * @param Origin
     * @param Destination
     */
    public void RejectFriend(String Origin, String Destination) {
    	//get the destination player
    	//Verify that the destination player has a request from the origin player
    	//remove the origin player from the destination player's pending friends list 
    	//Save the destination player
    }
    
    /**
     * Make both players (it doesn't matter the order) stop being friends
     * @param Origin
     * @param Destination
     */
    public void RemoveFriend(String Origin, String Destination) {
    	//Get the origin and destination player
    	//verify that both players *are* confirmed friends.
    	//remove the origin player from the destination player's friend list
    	//remove the destination player from the origin player's friend list
    	//Save both players
    }
    
}
