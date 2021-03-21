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
    @GetMapping(value = "/player/{Origin}-{Destination}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void AddFriend(String Origin, String Destination) {
    
    	//Get the destination player
    	Player D=getOne(Destination); 
    	
    	//Execute the request
    	//D.requestFriendship(Origin); //TODO: uncomment this
    	
    	//save the destination player
    	update(Destination, D);
    }
    
    /**
     * Makes the destination player accepts a request from the origin player
     * @param Origin
     * @param Destination
     */
    @GetMapping(value = "/player/{Origin}-{Destination}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void AcceptFriend(String Origin, String Destination) {
    	//Get the origin and destination player
    	Player D=getOne(Destination);
    	Player O=getOne(Origin);
    			
    	//Execute the accpet
    	D.acceptFriendship(Origin);
    	
    	//Forceadd the destination to the origin's list of friends
    	O.addFriend(Destination);
    	
		//Save both players
    	update(Destination, D);
    	update(Origin,O);
    }
    
    /**
     * Makes the destination player reject a request from the origin player
     * @param Origin
     * @param Destination
     */
    @GetMapping(value = "/player/{Origin}-{Destination}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void RejectFriend(String Origin, String Destination) {
    	//get the destination player
    	Player D=getOne(Destination);
    	
    	//Execute the reject
    	D.declineFriendship(Origin);
    	
    	//Save the destination player
    	update(Destination, D);
    }
    
    /**
     * Make both players (it doesn't matter the order) stop being friends
     * @param Origin
     * @param Destination
     */
    @GetMapping(value = "/player/{Origin}-{Destination}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void RemoveFriend(String Origin, String Destination) {
    	//Get the origin and destination player
    	Player D=getOne(Destination);
    	Player O=getOne(Origin);
    	
    	//remove the origin player from the destination player's friend list
    	D.removeFriend(Origin);
    	
    	//remove the destination player from the origin player's friend list
    	O.removeFriend(Destination);
    	
    	//Save both players
    	update(Destination, D);
    	update(Origin,O);
    	
    }
    
}
